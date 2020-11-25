// Initializes the `testing` service on path `/testing`
import { Service } from '@feathersjs/feathers';
import { SearchResponse } from '@algolia/client-search';
import { Application } from '../../declarations';
import { Algolia } from './algolia.class';
import hooks from './algolia.hooks';

// Add this service to the service type index
declare module '../../declarations' {
    interface ServiceTypes {
        'algolia': Service<SearchResponse> & Algolia
    }
}

export default function (app: Application): void {

    // Initialize our service with any options it requires
    app.use('/algolia', new Algolia());

    // Get our initialized service so that we can register hooks
    const service = app.service('algolia');

    service.hooks(hooks);

}