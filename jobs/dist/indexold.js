"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const dotenv_1 = __importDefault(require("dotenv"));
const handler_1 = __importDefault(require("./handler"));
dotenv_1.default.config();
const queueConfig = {
    connection: {
        host: process.env.REDIS_HOST || '',
        port: parseInt(process.env.REDIS_PORT) || 9999,
        password: process.env.REDIS_PASS || ''
    }
};
const queue = new bullmq_1.Queue('jobs', queueConfig);
const worker = new bullmq_1.Worker('jobs', handler_1.default, queueConfig);
const queueEvents = new bullmq_1.QueueEvents('jobs', queueConfig);
queue.add('DBSync', { name: 'SecondRun' });
