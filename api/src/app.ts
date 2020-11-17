import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import dontenv from 'dotenv';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio  from '@feathersjs/socketio';
import { HookContext as FeathersHookContext } from '@feathersjs/feathers';

import { Application } from './declarations';
import logger from './logger';
import auth from './auth';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import objection from './objection';
// Don't remove this comment. It's needed to format import lines nicely.

// Load DontEnv & Config
dontenv.config();

// Initialize Feathers App
const app: Application = express(feathers());

export type HookContext<T = any> = { app: Application } & FeathersHookContext<T>;

// Load app configuration
app.configure(configuration());

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3030' , credentials :  true}));
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
// Setup Socket
//app.configure(socketio());
// Setup Objection ORM
app.configure(objection);
// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
//app.configure(channels);
// Set up Auth
//app.configure(auth);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger } as any));

// Register App Hooks
app.hooks(appHooks);

export default app;
