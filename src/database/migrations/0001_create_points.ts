import Knex from 'knex';

export async function up (knex: Knex) {
    return knex.schema.createTable('points', table => {
        table.bigIncrements('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp', 30).notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
}

export async function down (knex: Knex) {
    return knex.schema.dropTable('points');
}