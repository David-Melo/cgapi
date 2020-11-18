exports.up = function(knex) {
    return knex.schema.createTable('testing', function (table) {
        table.increments('id').primary();
        table.string('name', 255);
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
}

exports.down = function down(knex) {
    return knex.schema.dropTable('testing');
}