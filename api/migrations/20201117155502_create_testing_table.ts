import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('testing', function (table) {
        table.increments('id').primary();
        table.string('name', 255);
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('testing');
}