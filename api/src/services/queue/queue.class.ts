import { ServiceMethods, Params, NullableId } from '@feathersjs/feathers';
import { Queue, QueueBaseOptions, Job, JobsOptions, QueueScheduler  } from 'bullmq';
import { setQueues } from "bull-board";

import { Application } from "../../declarations";

type JobTypes = 'waiting' | 'active' | 'delayed' | 'completed' | 'failed';

type FindJobsParams = {
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

    queue: Queue;
    scheduler: QueueScheduler;

    async find(params: FindJobsParams) {
        const jobTypes: JobTypes[] = [
            'waiting',
            'active',
            'delayed',
            'completed',
            'failed'
        ]
        let query = params.type ? params.type : params.types ? params.types : jobTypes;
        return this.queue.getJobs(query);
    }

    async get(id: string, params: Params) {
        return Job.fromId(this.queue, id);
    }

    async create({ name, data, opts = {} } : CreateJobInput, params: Params) {
        return this.queue.add(name, data, opts);
    }

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

        
        this.queue = new Queue('jobs', getConfig('MainQueueHandler'));
        this.scheduler = new QueueScheduler('jobs', getConfig('QueueScheduler'));

        setQueues([this.queue]);

        this.queue.add(
            'repeat', 
            { name: 'name' },
            { repeat: { every: 30000 } }
        );

    }

    getInstance() {
        return this.queue;
    }

    // Not Implemented
    async update(id: NullableId, data: any, params: Params) {}
    async patch(id: NullableId, data: any, params: Params) {}
    async remove(id: NullableId, params: Params) {}

}