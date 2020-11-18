import throng from "throng";
import dontenv from 'dotenv';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { Queue, QueueEvents, QueueOptions, QueueBaseOptions, Worker, Processor, Job } from 'bullmq';

dontenv.config();

export type JobType = {
    name: string;
}

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

//const queueEvents = new QueueEvents('jobs', getConfig('EventListener'));

const handler = (id, disconnect) => {

    const socket = io('http://localhost:3030', { transports: ['websocket'] });
    const app = feathers();
    app.configure(socketio(socket));
    
    app.service('testing').on('created', message => console.log('New message created', message));

    const workerId = `Worker${id}`;

    const log = (msg: string) => {
        console.log(`[${workerId}] - ${msg}`);
    }

    log('started');

    const worker = new Worker('jobs', async (job: Job<JobType>) => {
        log(`Started Job: ${job.name}`);
        // let test = await Test.query().insert({
        //     name: job.data.name
        // });
        // console.log(test);
        app.service('testing').create({name:`${job.name} ${job.id}`});
        return 'ok';
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
    worker: handler,
    count: 1
});

// queueEvents.on('waiting', ({ jobId }) => {
//     console.log(`A job with ID ${jobId} is waiting`);
// });

// queueEvents.on('active', ({ jobId, prev }) => {
//     console.log(`Job ${jobId} is now active; previous status was ${prev}`);
// });

// queueEvents.on('completed', ({ jobId, returnvalue }) => {
//     console.log(`${jobId} has completed and returned ${JSON.stringify(returnvalue)}`);
// });

// queueEvents.on('failed', ({ jobId, failedReason }) => {
//     console.log(`${jobId} has failed with reason ${JSON.stringify(failedReason)}`);
// });