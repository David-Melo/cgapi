import { Processor, Job } from 'bullmq';
// import Knex from 'knex';
// import { Model } from 'objection'

// import knexConfig from '../knexfile'
// import Test from './models/Test';

// const knex = Knex(knexConfig);
// Model.knex(knex);

export type JobType = {
    name: string;
}

const handler: Processor = async (job: Job<JobType>) => {
    console.log('ProcessingJob:' + job.name);
    // let test = await Test.query().insert({
    //     name: job.data.name
    // });
    // console.log(test);
    return 'ok';
}

export default handler;