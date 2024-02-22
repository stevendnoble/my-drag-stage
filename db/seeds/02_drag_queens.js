exports.seed = async function(knex) {
  // Deletes ALL existing entries for a clean slate
  await knex('drag_queens').del();

  await knex('drag_queens').insert([
    // Season 1 Queens
    {name: 'BeBe Zahara Benet', age_during_season: 28, hometown: 'Cameroon', placement: 1, season_id: 1},
    {name: 'Nina Flowers', age_during_season: 34, hometown: 'Puerto Rico', placement: 2, season_id: 1},
    {name: 'Rebecca Glasscock', age_during_season: 26, hometown: 'Florida', placement: 3, season_id: 1},
    {name: 'Shannel', age_during_season: 29, hometown: 'Las Vegas, Nevada', placement: 4, season_id: 1},
    {name: 'Ongina', age_during_season: 26, hometown: 'Los Angeles, California', placement: 5, season_id: 1},
    {name: 'Jade', age_during_season: 25, hometown: 'Chicago, Illinois', placement: 6, season_id: 1},
    {name: 'Akashia', age_during_season: 24, hometown: 'Cleveland, Ohio', placement: 7, season_id: 1},
    {name: 'Tammie Brown', age_during_season: 29, hometown: 'Long Beach, California', placement: 8, season_id: 1},
    {name: 'Victoria "Porkchop" Parker', age_during_season: 39, hometown: 'Raleigh, North Carolina', placement: 9, season_id: 1},

    // Season 2 Queens
    {name: 'Tyra Sanchez', age_during_season: 21, hometown: 'Orlando, Florida', placement: 1, season_id: 2},
    {name: 'Raven', age_during_season: 30, hometown: 'Riverside, California', placement: 2, season_id: 2},
    {name: 'Jujubee', age_during_season: 25, hometown: 'Boston, Massachusetts', placement: 3, season_id: 2},
    {name: 'Tatianna', age_during_season: 21, hometown: 'Falls Church, Virginia', placement: 4, season_id: 2},
    {name: 'Pandora Boxx', age_during_season: 37, hometown: 'Rochester, New York', placement: 5, season_id: 2},
    {name: 'Jessica Wild', age_during_season: 29, hometown: 'San Juan, Puerto Rico', placement: 6, season_id: 2},
    {name: 'Sahara Davenport', age_during_season: 25, hometown: 'Dallas, Texas', placement: 7, season_id: 2},
    {name: 'Morgan McMichaels', age_during_season: 28, hometown: 'Mira Loma, California', placement: 8, season_id: 2},
    {name: 'Sonique', age_during_season: 26, hometown: 'Atlanta, Georgia', placement: 9, season_id: 2},
    {name: 'Mystique Summers Madison', age_during_season: 25, hometown: 'Chicago, Illinois', placement: 10, season_id: 2},
    {name: 'Nicole Paige Brooks', age_during_season: 36, hometown: 'Atlanta, Georgia', placement: 11, season_id: 2},
    {name: 'Shangela Laquifa Wadley', age_during_season: 28, hometown: 'Paris, Texas', placement: 12, season_id: 2},

    // Season 3 Queens
    {name: 'Raja', age_during_season: 36, hometown: 'Los Angeles, California', placement: 1, season_id: 3},
    {name: 'Manila Luzon', age_during_season: 28, hometown: 'New York, New York', placement: 2, season_id: 3},
    {name: 'Alexis Mateo', age_during_season: 30, hometown: 'St. Petersburg, Florida', placement: 3, season_id: 3},
    {name: 'Yara Sofia', age_during_season: 28, hometown: 'Bayamon, Puerto Rico', placement: 4, season_id: 3},
    {name: 'Carmen Carrera', age_during_season: 25, hometown: 'Elmwood Park, New Jersey', placement: 5, season_id: 3},
    {name: 'Shangela Laquifa Wadley', age_during_season: 29, hometown: 'Paris, Texas', placement: 6, season_id: 3},
    {name: 'Delta Work', age_during_season: 34, hometown: 'Norwalk, California', placement: 7, season_id: 3},
    {name: 'Stacy Layne Matthews', age_during_season: 25, hometown: 'Back Swamp, North Carolina', placement: 8, season_id: 3},
    {name: 'Mariah Paris Balenciaga', age_during_season: 29, hometown: 'Atlanta, Georgia', placement: 9, season_id: 3},
    {name: 'India Ferrah', age_during_season: 23, hometown: 'Dayton, Ohio', placement: 10, season_id: 3},
    {name: 'Mimi Imfurst', age_during_season: 27, hometown: 'Philadelphia, Pennsylvania', placement: 11, season_id: 3},
    {name: 'Phoenix', age_during_season: 29, hometown: 'Atlanta, Georgia', placement: 12, season_id: 3},
    {name: 'Venus D-Lite', age_during_season: 26, hometown: 'Los Angeles, California', placement: 13, season_id: 3},
  ]);
};