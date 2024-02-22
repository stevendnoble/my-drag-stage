const knexConfig = require("../knexfile.js");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);

const validOrderBys = {
  seasons: ["id", "name", "year", "seasons.id"],
  drag_queens: [
    "id",
    "name",
    "age_during_season",
    "hometown",
    "placement",
    "year",
    "year,placement",
  ],
};

const allowedKeys = {
  seasons: ["name", "year"],
  drag_queens: [
    "name",
    "age_during_season",
    "hometown",
    "placement",
    "season_id",
  ],
};

function filterObject(originalObject, allowedKeys) {
  return Object.keys(originalObject).reduce((obj, key) => {
    if (allowedKeys.includes(key)) {
      obj[key] = originalObject[key];
    }
    return obj;
  }, {});
}

function validateOrderBy(table, orderBy) {
  if (!validOrderBys[table].includes(orderBy)) {
    throw new Error("Invalid order parameter");
  }
  return orderBy;
}

function getAllObjects(table, orderBy = "id") {
  return knex(table).orderBy(orderBy.split(","));
}

function getAllSeasonsWithCounts(orderBy = "id") {
  validateOrderBy("seasons", orderBy);
  return knex("seasons")
    .leftJoin("drag_queens", "seasons.id", "drag_queens.season_id")
    .select("seasons.id", "seasons.name", "seasons.year")
    .count("drag_queens.id as drag_queen_count")
    .groupBy("seasons.id")
    .orderBy(orderBy.split(","));
}

function getAllDragQueensWithSeasons(orderBy = "id") {
  validateOrderBy("drag_queens", orderBy);
  return knex("drag_queens")
    .leftJoin("seasons", "seasons.id", "drag_queens.season_id")
    .select(
      "drag_queens.id as drag_queen_id",
      "drag_queens.name as drag_queen_name",
      "seasons.name as season_name",
      "*",
    )
    .orderBy(orderBy.split(","));
}

function addNewObject(table, requestParams) {
  const filteredParams = filterObject(requestParams, allowedKeys[table]);
  return knex(table).insert(filteredParams);
}

function getObjectById(table, id) {
  return knex(table).where({ id: id });
}

function getDragQueensBySeasonId(season_id) {
  return knex("drag_queens").where({ season_id: season_id });
}

function updateObject(table, request) {
  const { id } = request.params;
  const filteredParams = filterObject(request.body, allowedKeys[table]);
  return knex(table).where({ id: id }).update(filteredParams);
}

function deleteObject(table, id) {
  return knex(table).where({ id: id }).del();
}

module.exports = {
  getAllObjects,
  getAllSeasonsWithCounts,
  getAllDragQueensWithSeasons,
  addNewObject,
  getObjectById,
  getDragQueensBySeasonId,
  updateObject,
  deleteObject,
};
