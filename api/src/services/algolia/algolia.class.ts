import { ServiceMethods, Params, NullableId, Id } from '@feathersjs/feathers';
import algoliasearch, { SearchIndex, SearchClient } from 'algoliasearch';

import { Application } from "../../declarations";

export class Algolia implements ServiceMethods<any> {

    app: Application;
    client: SearchClient;
    index: SearchIndex;

    setup(app: Application) {
        let { appid, key, index: indexName } = app.get('algolia');
        this.app = app;
        this.client = algoliasearch(appid, key);
        this.index = this.client.initIndex(indexName);
    }

    async find(params: Params) {
        let pagination = this.app.get('paginate');
        return this.index.search(
            params.query.term || '', 
            {
                offset: params.query['$skip'] || 0,
                length: params.query['$limit'] || pagination.default
            }
        );
    }

    async get(id: Id, params: Params) {
        return this.index.getObject(id.toString());
    }

    async create(data: any, params: Params) {
        if (Array.isArray(data)){
            return this.index.saveObjects(data);
        } else {
            return this.index.saveObject(data);
        }
    }

    async update(id: NullableId, data: any, params: Params) {
        return this.index.saveObject(data);
    }

    async patch(id: NullableId, data: any, params: Params) {
        return this.index.partialUpdateObject(data, { createIfNotExists: false });
    }

    async remove(id: NullableId, params: Params) {
        return this.index.deleteObject(id.toString());
    }

}