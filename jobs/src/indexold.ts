import { Queue, QueueEvents, QueueOptions, QueueBaseOptions, Worker } from 'bullmq';
import dontenv from 'dotenv';
import handler, { JobType } from './handler';

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

queue.add( 'DBSync', { name: 'SecondRun' } );

