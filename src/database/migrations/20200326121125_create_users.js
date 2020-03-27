exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('name').notNullable();
        table.string('id').primary();
        table.string('password').notNullable();
        
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();

        table.string('email').notNullable();
        table.string('whatsapp').notNullable();       
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
