/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("drag_queens", function (table) {
    table.increments("id").primary(); // Auto-incrementing primary key
    table.string("name").notNullable(); // Drag queen's name
    table.integer("age_during_season").notNullable(); // Age during the season
    table.string("hometown").notNullable(); // Hometown
    table.integer("placement").notNullable(); // Placement in the competition
    table.integer("season_id").unsigned().notNullable(); // Foreign key to the 'seasons' table
    table.foreign("season_id").references("seasons.id"); // Establishes the foreign key relationship
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("drag_queens"); // Drops the 'drag_queens' table if rolling back
};
