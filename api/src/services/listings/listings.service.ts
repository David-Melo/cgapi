// Initializes the `testing` service on path `/testing`
import { Service, ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Listings } from './listings.class';
import createModel from '../../models/listings.model';
import hooks from './listings.hooks';

export type Listing = {
    id?: string;
    sysid: string;
    mls: string;
    status: string;
    code: string;
    created_at?: string;
    updated_at?: string;
}

// Add this service to the service type index
declare module '../../declarations' {
    interface ServiceTypes {
        'listings': Service<Listing> & Listings
    }
}

export default function (app: Application): void {

    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        multi: [ 'remove' ]
    };

    // Initialize our service with any options it requires
    app.use('/listings', new Listings(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('listings');

    service.hooks(hooks);

}