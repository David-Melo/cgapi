import { Application as ExpressFeathers } from '@feathersjs/express';

// A mapping of service names to types. Will be extended in service files.
export interface ServiceTypes {}

// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes>;

export type Testing = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}