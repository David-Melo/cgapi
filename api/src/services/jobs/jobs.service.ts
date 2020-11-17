// Initializes the `drives` service on path `/drives`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { setQueues, router } from "bull-board";
import { Queue, QueueEvents, QueueOptions, QueueBaseOptions, Worker } from 'bullmq';
import configuration from '@feathersjs/configuration';

// Add this service to the service type index
declare module '../../declarations' {
    interface ServiceTypes {
        'jobs': ServiceAddons<any>; 
    }
}

export default function (app: Application): void {   
    app.use('/jobs', router); 
}