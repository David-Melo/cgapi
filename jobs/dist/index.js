"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const throng_1 = __importDefault(require("throng"));
const dotenv_1 = __importDefault(require("dotenv"));
const feathers_1 = __importDefault(require("@feathersjs/feathers"));
const socketio_client_1 = __importDefault(require("@feathersjs/socketio-client"));
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const bullmq_1 = require("bullmq");
dotenv_1.default.config();
console.log('hi');
const socket = socket_io_client_1.default('http://localhost:3030', { transports: ['websocket'] });
const app = feathers_1.default();
app.configure(socketio_client_1.default(socket));
app.service('testing').on('created', message => console.log('New message created', message));
const getConfig = (connectionName) => {
    const queueConfig = {
        connection: {
            connectionName,
            name: connectionName,
            host: process.env.REDIS_HOST || '',
            port: parseInt(process.env.REDIS_PORT) || 9999,
            password: process.env.REDIS_PASS || ''
        }
    };
    return queueConfig;
};
//const queueEvents = new QueueEvents('jobs', getConfig('EventListener'));
const handler = (id, disconnect) => {
    const workerId = `Worker${id}`;
    const log = (msg) => {
        console.log(`[${workerId}] - ${msg}`);
    };
    log('started');
    const worker = new bullmq_1.Worker('jobs', (job) => __awaiter(void 0, void 0, void 0, function* () {
        log(`Started Job: ${job.name}`);
        // let test = await Test.query().insert({
        //     name: job.data.name
        // });
        // console.log(test);
        return 'ok';
    }), getConfig(workerId));
    worker.on('drained', (job) => {
        log('Drained');
    });
    worker.on('completed', (job) => {
        log(`Completed Job: ${job.name}`);
    });
    worker.on('failed', (job) => {
        log(`Job Failed: ${job.name}`);
    });
    process.once('SIGTERM', shutdown);
    process.once('SIGINT', shutdown);
    function shutdown() {
        log(`Cleaning Up`);
        disconnect();
    }
};
throng_1.default({
    worker: handler,
    count: 2
});
// queueEvents.on('waiting', ({ jobId }) => {
//     console.log(`A job with ID ${jobId} is waiting`);
// });
// queueEvents.on('active', ({ jobId, prev }) => {
//     console.log(`Job ${jobId} is now active; previous status was ${prev}`);
// });
// queueEvents.on('completed', ({ jobId, returnvalue }) => {
//     console.log(`${jobId} has completed and returned ${JSON.stringify(returnvalue)}`);
// });
// queueEvents.on('failed', ({ jobId, failedReason }) => {
//     console.log(`${jobId} has failed with reason ${JSON.stringify(failedReason)}`);
// });
