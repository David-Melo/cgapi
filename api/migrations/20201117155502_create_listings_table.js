exports.up = function(knex) {
    return knex.schema.createTable('listings', function (table) {
        table.increments('id').primary();
        table.string('sysid', 255);
        table.string('mls', 255);
        table.string('status', 255);
        table.string('code', 3);
        table.timestamp('created_at');
        table.timestamp('updated_at');
        table.index(['id','sysid']);
    });
}

exports.down = function down(knex) {
    return knex.schema.dropTable('listings');
}