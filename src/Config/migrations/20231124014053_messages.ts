import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id').primary();
    table.integer('sender_id').notNullable();
    table.integer('recipient_id').notNullable();
    table.string('content').notNullable();
    table.timestamp('timestamp').defaultTo(knex.fn.now());

    // Foreign key constraints
    table
      .foreign('sender_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .foreign('recipient_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('messages');
}
