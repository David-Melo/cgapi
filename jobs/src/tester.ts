import dontenv from 'dotenv';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

dontenv.config();

const API_SOCKET_URL = `https://api.canerogroup.com`;

const socket = io(API_SOCKET_URL, { transports: ['websocket'] });
const app = feathers();
app.configure(socketio(socket));

const go = async () => {
    
    try {

        var listing = await app.service('listings').remove(null, { query: { sysid: '8303293da8159a5752324e7317e8dfad', mls: 'A10964887' } });
        console.log(listing)
        return listing;

    } catch (e) {
        if (e.code===404) {
            return Promise.resolve(e.message);
        }
        return Promise.reject(e);
    }

}

go().then(e=>console.log('yay',e)).catch(e=>console.log('booo',Object.keys(e)));