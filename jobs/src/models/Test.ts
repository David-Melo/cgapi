import { JSONSchema, Model } from 'objection';

export default class Test extends Model {

    id!: number;
    name!: string;
    created_at!: string;
    updated_at!: string;

    static get tableName(): string {
        return 'test';
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' }
            }
        };

    }

}