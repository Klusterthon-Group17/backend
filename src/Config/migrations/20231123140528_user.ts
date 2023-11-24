import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary();
    table.string('email', 100).unique().notNullable();
    table.string('password', 100).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('token', (table) => {
    table.increments('id').unsigned().primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('ip').notNullable();
    table.string('userAgent').notNullable();
    table.boolean('isValid').notNullable();
    table.integer('userId').unsigned().references('id').inTable('users');
    table.string('refresh_token').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('token');
}
