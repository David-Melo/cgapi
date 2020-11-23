import { ServiceMethods, Params, NullableId, Id } from '@feathersjs/feathers';
import { Queue, QueueBaseOptions, Job, JobsOptions, QueueScheduler  } from 'bullmq';
import { setQueues } from "bull-board";

import { Application } from "../../declarations";

type JobTypes = 'waiting' | 'active' | 'delayed' | 'completed' | 'failed';

type FindJobsParams = {
    queue: 'queries' | 'listings';
    type?: JobTypes;
    types?: JobTypes[];
    start?: number;
    end?: number;
    asc?: boolean;
}

type CreateJobInput = {
    name: string;
    data: object;
    opts?: JobsOptions 
}

export class JobQueue implements ServiceMethods<any> {

    setup(app: Application, path: string) {

        let { host, port, password } = app.get('redis');

        const getConfig = (connectionName: string) => {
            const queueConfig: QueueBaseOptions = {
                connection: {
                    connectionName,
                    host: host, 
                    port:  port, 
                    password: password
                }
            }
            return queueConfig;
        }
        
        const QueryViewer = new Queue('queries', getConfig('QueryViewer'));
        const ListingViewer = new Queue('listings', getConfig('ListingViewer'));
        
        const QueryScheduler = new QueueScheduler('queries', getConfig('QueryScheduler'));
        const ListingScheduler = new QueueScheduler('listings', getConfig('ListingScheduler'));

        setQueues([QueryViewer, ListingViewer]);

        // this.queues.queries.add(
        //     'repeat', 
        //     { name: 'name' },
        //     { repeat: { every: 30000 } }
        // );

    }

    // Not Implemented
    async find(params: Params) {}
    async get(id: Id, params: Params) {}
    async create(data: any, params: Params) {}
    async update(id: NullableId, data: any, params: Params) {}
    async patch(id: NullableId, data: any, params: Params) {}
    async remove(id: NullableId, params: Params) {}

}