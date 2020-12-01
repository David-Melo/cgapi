import throng, { ProcessCallback } from "throng";
import dontenv from 'dotenv';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { sub, format } from 'date-fns'
import { Queue, QueueBaseOptions, Worker, Job } from 'bullmq';

import { ProcessRE1Query, ProcessRE2Query, ProcessRNTQuery, ProcessCOMQuery, ProcessCLDQuery, ProcessRLDQuery, ProcessRINQuery, ProcessBUSQuery, QueryFunction, ProcessBUSQueryBacklog, ProcessCLDQueryBacklog, ProcessCOMQueryBacklog, ProcessRE1QueryBacklog, ProcessRE2QueryBacklog, ProcessRINQueryBacklog, ProcessRLDQueryBacklog, ProcessRNTQueryBacklog, ProcessCleanUpQuery } from "./utils/functions";
import { ListingCode, ListingType } from "./_types";

dontenv.config();

const API_SOCKET_URL = `http://${process.env.API_HOST}:${process.env.API_PORT}`;
const CRON_DAILY_SCHEDULE = '0 0 1 ? * * *'; // Daily At 1AM

type QueryFunctions = {
    [key in ListingCode]: QueryFunction
}

type QueryJobType = {
    code: ListingCode;
    type: 'daily' | 'single',
    mode: 'insert' | 'delete'
}

type ListingJobType = {
    mode: QueryJobType['mode'],
    listing: ListingType;
}

const getConfig = (connectionName: string) => {
    const queueConfig: QueueBaseOptions = {
        connection: {
            connectionName,
            name: connectionName,
            host: process.env.REDIS_HOST || '',
            port: parseInt(process.env.REDIS_PORT) || 9999,
            password: process.env.REDIS_PASS || ''
        }
    }
    return queueConfig;
}

const QueryHandler: ProcessCallback = async () => {

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
        'CLEANUP': ProcessCleanUpQuery
    }

    // BackLog Queries                        
    // const queryFunctionsBacklog: Omit<QueryFunctions, 'CLEANUP'> = {
    //     'RE1': ProcessRE1QueryBacklog,
    //     'RE2': ProcessRE2QueryBacklog,
    //     'RNT': ProcessRNTQueryBacklog,
    //     'COM': ProcessCOMQueryBacklog,
    //     'CLD': ProcessCLDQueryBacklog,
    //     'RLD': ProcessRLDQueryBacklog,
    //     'RIN': ProcessRINQueryBacklog,
    //     'BUS': ProcessBUSQueryBacklog,
    // }

    const ListingQueue = new Queue<ListingJobType>('listings', getConfig('ListingsDispatcher'));

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

        // If Daily, Set To Previous Day
        let queryParam = job.data.type === 'daily' ? format(sub(new Date(), { days: 1 }), 'yyyy-MM-dd') : null;

        let queryListings = await queryFunction(queryParam);

        updateProgress(5);

        log(`[${job.name}]: Queuing: ${queryListings.length} Listings`);

        listingsProgressIncrement = 90 / queryListings.length;

        queryListings.forEach(listing => {
            updateProgress(listingsProgressIncrement);
            ListingQueue.add(
                `ListingSync[${job.data.code}][${job.data.mode}]`,
                { 
                    listing,
                    mode: job.data.mode
                 },
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

    process.on('beforeExit', () => {
        log(`Clean Up`);
    });

}

const ListingHandler: ProcessCallback = (id) => {

    const socket = io(API_SOCKET_URL, { transports: ['websocket'] });
    const app = feathers();
    app.configure(socketio(socket));

    const workerId = `Worker${id}`;

    const log = (msg: string) => {
        console.log(`[${workerId}] - ${msg}`);
    }

    log('started');

    const worker = new Worker('listings', async (job: Job<ListingJobType>) => {

        log(`Started Job: ${job.name}`);

        try {

            switch(job.data.mode) {

                case 'insert':
                    var listing = await app.service('listings').create(job.data.listing);
                    break;

                case 'delete':
                    var listing = await app.service('listings').remove(null, { query: { sysid: job.data.listing.sysid, mls: job.data.listing.mls } });
                    break;

                default:
                    return Promise.reject(new Error(`ListingJobType Mode Not Set`));

            }
            
            job.updateProgress(100);
            return listing;

        } catch (e) {
            return Promise.reject(e.message);
        }

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
}

throng({
    master: QueryHandler,
    worker: ListingHandler,
    count: 1
});