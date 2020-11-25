import { Application } from '../declarations';
import queue from './queue/queue.service';
import jobs from './jobs/jobs.service';
import listings from './listings/listings.service';
import algolia from './algolia/algolia.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(queue);
    app.configure(jobs);
    app.configure(listings);
    app.configure(algolia);
}