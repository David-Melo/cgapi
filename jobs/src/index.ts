import throng from "throng";
import dontenv from 'dotenv';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { Queue, QueueEvents, QueueOptions, QueueBaseOptions, Worker, Processor, Job } from 'bullmq';

import { ProcessRE1Query, ProcessRE2Query, ProcessRNTQuery, ProcessCOMQuery, ProcessCLDQuery, ProcessRLDQuery, ProcessRINQuery, ProcessBUSQuery, QueryFunction } from "./utils/functions";
import { ListingCode, ListingType } from "./_types";

dontenv.config();

type QueryFunctions = {
    [key in ListingCode]: QueryFunction
} 

type QueryJobType = {
    code: ListingCode;
}

type ListingJobType = {
    listing: ListingType;
}

// 1. Daily Check For Each Active Items In Each Query Modified On That Date
// 2. Check Will Find Lots Of Items
// 3. Each Item Will Get Queued

const getConfig = (connectionName: string) => {
    const queueConfig: QueueBaseOptions = {
        connection: {
            connectionName,
            name: connectionName,
            host: process.env.REDIS_HOST || '', 
            port:  parseInt(process.env.REDIS_PORT) || 9999, 
            password: process.env.REDIS_PASS || ''
        }
    }
    return queueConfig;
}

const QueryHandler = async () => {

    const log = (msg: string) => {
        console.log(`[QueryHandler]: ${msg}`);
    }

    const queryFunctions: QueryFunctions = {
        'RE1': ProcessRE1Query,
        'RE2': ProcessRE2Query,
        'RNT': ProcessRNTQuery,
        'COM': ProcessCOMQuery,
        'CLD': ProcessCLDQuery,
        'RLD': ProcessRLDQuery,
        'RIN': ProcessRINQuery,
        'BUS': ProcessBUSQuery,
    }

    const QueryQueue = new Queue<QueryJobType>('queries', getConfig('QueryHandler'));
    const ListingQueue = new Queue<ListingJobType>('listings', getConfig('ListingsDispatcher'));

    QueryQueue.clean

    const QueryWorker = new Worker<QueryJobType>('queries', async (job: Job<QueryJobType>) => {

        let progress = 0;
        let listingsProgressIncrement = 1;

        const updateProgress = (increment: number) => {
            progress = progress + increment;
            job.updateProgress(progress);
            log(`[${job.name}]: Progress - ${progress}/100`);
        }

        log(`[${job.name}]: Worker Started`);

        updateProgress(5);

        let queryFunction: QueryFunction = queryFunctions[job.data.code];

        let queryListings = await queryFunction();

        updateProgress(5);

        log(`[${job.name}]: Queuing: ${queryListings.length} Listings`);

        listingsProgressIncrement = 90 / queryListings.length;

        queryListings.forEach(listing=>{
            updateProgress(listingsProgressIncrement);
            ListingQueue.add( 
                `ListingSync${job.data.code}`,
                { listing }, 
                { 
                    jobId: listing.sysid, 
                    removeOnComplete: true,
                    attempts: 3,
                    backoff: {
                        type: 'exponential',
                        delay: 60000,
                    }
                }
            );
        })
        
    }, getConfig('QueryWorker'));

    QueryWorker.on('drained', (job: Job<QueryJobType>) => {
        log('Finished Running Pending Query')
    });
    
    QueryWorker.on('completed', (job: Job<QueryJobType>) => {
        log(`[${job.name}]: Job Completed`);
    });
    
    QueryWorker.on('failed', (job: Job<QueryJobType>) => {
        log(`[${job.name}]: Job Failed`);
    });

    QueryQueue.add( 'DailyQuerySyncRE1', { code: 'RE1' }, { repeat: { every: 60000 } } );
    // QueryQueue.add( 'DailyQuerySyncRE2', { code: 'RE2' }, { repeat: { every: 60000 } } );
    // QueryQueue.add( 'DailyQuerySyncRNT', { code: 'RNT' }, { repeat: { every: 60000 } } );
    // QueryQueue.add( 'DailyQuerySyncCOM', { code: 'COM' }, { repeat: { every: 60000 } } );
    // QueryQueue.add( 'DailyQuerySyncCLD', { code: 'CLD' }, { repeat: { every: 60000 } } );
    // QueryQueue.add( 'DailyQuerySyncRLD', { code: 'RLD' }, { repeat: { every: 60000 } } );
    // QueryQueue.add( 'DailyQuerySyncBUS', { code: 'BUS' }, { repeat: { every: 60000 } } );
    // QueryQueue.add( 'DailyQuerySyncRIN', { code: 'RIN' }, { repeat: { every: 60000 } } );

    process.on('beforeExit', () => {
        log(`Clean Up`);
    });

}

const ListingHandler = (id, disconnect) => {

    const socket = io('http://localhost:3030', { transports: ['websocket'] });
    const app = feathers();
    app.configure(socketio(socket));
    
    app.service('listings').on('created', message => console.log('New listing created', message));

    const workerId = `Worker${id}`;

    const log = (msg: string) => {
        console.log(`[${workerId}] - ${msg}`);
    }

    log('started');

    const worker = new Worker('listings', async (job: Job<ListingJobType>) => {
        log(`Started Job: ${job.name}`);
        await app.service('listings').create(job.data.listing);
        job.updateProgress(100);
    }, getConfig(workerId));

    worker.on('drained', (job: Job) => {
        log('Drained')
    });
    
    worker.on('completed', (job: Job) => {
        log(`Completed Job: ${job.name}`);
    });
    
    worker.on('failed', (job: Job) => {
        log(`Job Failed: ${job.name}`);
    });

    process.once('SIGTERM', shutdown);
    process.once('SIGINT', shutdown);

    function shutdown() {
        log(`Cleaning Up`);
        disconnect();
    }
}

throng({
    master: QueryHandler,
    worker: ListingHandler,
    count: 1
});