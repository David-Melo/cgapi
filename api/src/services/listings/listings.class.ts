import { Service, ObjectionServiceOptions } from 'feathers-objection';
import { Application } from '../../declarations';
import { Listing } from './listings.service';

interface Options extends ObjectionServiceOptions {
    Model: any;
}

export class Listings extends Service<Listing> {
    constructor(options: Partial<Options>, app: Application) {
        const { Model, ...otherOptions } = options;
        super({
            ...otherOptions,
            model: Model
        });
    }
}
