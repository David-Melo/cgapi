import { Model, JSONSchema } from 'objection';
import { Application } from '../declarations';

class Testing extends Model {

    name!:string;
    created_at!: string;
    updated_at!: string;

    static get tableName(): string {
        return 'testing';
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

    $beforeInsert(): void {
        this.created_at = this.created_at = new Date().toISOString();
    }

    $beforeUpdate(): void {
        this.updated_at = new Date().toISOString();
    }
}

export default function (app: Application): typeof Testing {
    return Testing;
}