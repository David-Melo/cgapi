// Initializes the `drives` service on path `/drives`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { router } from "bull-board";

// Add this service to the service type index
declare module '../../declarations' {
    interface ServiceTypes {
        'jobs': ServiceAddons<any>; 
    }
}

export default function (app: Application): void {   
    app.use('/jobs', router); 
}