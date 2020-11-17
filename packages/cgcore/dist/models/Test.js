"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Test extends objection_1.Model {
    static get tableName() {
        return 'test';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' }
            }
        };
    }
}
exports.default = Test;
