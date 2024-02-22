exports.seed = async function(knex) {
  // Deletes ALL existing entries for a clean slate
  await knex('seasons').del();

  await knex('seasons').insert([
    {id: 1, name: 'Season 1', year: 2009},
    {id: 2, name: 'Season 2', year: 2010},
    {id: 3, name: 'Season 3', year: 2011},
  ]);
};
