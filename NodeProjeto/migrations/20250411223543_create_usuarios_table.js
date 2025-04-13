// migrations/YYYYMMDD_create_usuarios_table.js
export function up(knex) {
    return knex.schema.createTable('usuarios', function(table) {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('senha').notNullable();
      table.timestamp('criado_em').defaultTo(knex.fn.now());
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable('usuarios');
  }
  