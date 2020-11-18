import '@feathersjs/transport-commons';
import { HookContext } from '@feathersjs/feathers';
import { Application } from './declarations';

export default function (app: Application): void {

    if (typeof app.channel !== 'function') {
        return;
    }

    app.on('connection', (connection: any): void => {
        console.log('SocketJoined',connection)
        app.channel('anonymous').join(connection);
    });

    app.publish((data, hook) => {
        console.log('Publishing all events to all authenticated users.');
        return app.channel(app.channels);
      });

}
