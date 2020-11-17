import { Queue, QueueEvents, QueueOptions, QueueBaseOptions, Worker } from 'bullmq';
import dontenv from 'dotenv';
import handler, { JobType } from './handler';
import MyClass from 'cgcore';

dontenv.config();

const queueConfig: QueueBaseOptions = {
    connection: {
        host: process.env.REDIS_HOST || '', 
        port:  parseInt(process.env.REDIS_PORT) || 9999, 
        password: process.env.REDIS_PASS || ''
    }
}

const queue = new Queue<JobType>('jobs', queueConfig);
const worker = new Worker('jobs', handler, queueConfig);
const queueEvents = new QueueEvents('jobs', queueConfig);

let ok = new MyClass();

queue.add( 'DBSync', { name: 'SecondRun' } );

queueEvents.on('waiting', ({ jobId }) => {
    console.log(`A job with ID ${jobId} is waiting`);
});

queueEvents.on('active', ({ jobId, prev }) => {
    console.log(`Job ${jobId} is now active; previous status was ${prev}`);
});

queueEvents.on('completed', ({ jobId, returnvalue }) => {
    console.log(`${jobId} has completed and returned ${JSON.stringify(returnvalue)}`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
    console.log(`${jobId} has failed with reason ${failedReason}`);
});