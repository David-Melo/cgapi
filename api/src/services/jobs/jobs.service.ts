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
    let {host,port,password} = app.get('redis');
    console.log(port)
    const queueConfig: QueueBaseOptions = {
        connection: {
            host: host, 
            port:  port, 
            password: password
        }
    }    
    const queue = new Queue('jobs', queueConfig);    
    setQueues([queue]);
    app.use('/jobs', router); 
}