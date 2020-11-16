import * as Knex from "knex";

const tableName = 'test';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary();
        table.string('name', 255);
        table.timestamps(false, true);
    });
    await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON ${tableName}
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `);
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}