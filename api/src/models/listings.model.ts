import { Model, JSONSchema } from 'objection';
import { Application } from '../declarations';

class Listing extends Model {

    id!:number;
    sysid!:string;
    mls!:string;
    status!:string;
    code!:string;
    created_at!: string;
    updated_at!: string;

    static get tableName(): string {
        return 'listings';
    }

    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: [
                'sysid',
                'mls',
                'status',
                'code'
            ],
            properties: {
                sysid: { type: 'string' },
                mls: { type: 'string' },
                status: { type: 'string' },
                code: { type: 'string' }
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

export default function (app: Application): typeof Listing {
    return Listing;
}