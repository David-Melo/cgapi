// Initializes the `testing` service on path `/testing`
import { Service, ServiceAddons, ServiceOverloads } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { JobQueue } from './queue.class';
import hooks from './queue.hooks';

// Add this service to the service type index
declare module '../../declarations' {
    interface ServiceTypes {
        'queue': JobQueue & Service<any>;
    }
}

export default function (app: Application): void {

    // Initialize our service with any options it requires
    app.use('/queue', new JobQueue());

    // Get our initialized service so that we can register hooks
    const service = app.service('queue');

    service.hooks(hooks);
    
}