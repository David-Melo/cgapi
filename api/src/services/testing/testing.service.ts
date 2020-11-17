// Initializes the `testing` service on path `/testing`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Testing } from './testing.class';
import createModel from '../../models/testing.model';
import hooks from './testing.hooks';

// Add this service to the service type index
declare module '../../declarations' {
    interface ServiceTypes {
        'testing': Testing & ServiceAddons<any>;
    }
}

export default function (app: Application): void {

    const options = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/testing', new Testing(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('testing');

    service.hooks(hooks);

}