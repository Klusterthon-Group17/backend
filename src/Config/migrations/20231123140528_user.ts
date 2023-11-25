import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary();
    table.string('email', 100).unique().notNullable();
    table.string('password', 100).notNullable();
    table.string('verificationToken').notNullable();
    table.string('passwordToken', 100);
    table.string('passwordTokenExpirationDate', 100);
    table.string('resetToken');
    table.boolean('isVerified').defaultTo(false);
    table.dateTime('verified');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
