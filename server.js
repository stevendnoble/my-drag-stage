const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      expressLayouts = require('express-ejs-layouts'),
			knexConfig = require('./knexfile.js'),
			knex = require('knex')(knexConfig[process.env.NODE_ENV]),
			port = 3000;

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('layout', 'layout');

function filterObject(originalObject, allowedKeys) {
  return Object.keys(originalObject).reduce((obj, key) => {
    if (allowedKeys.includes(key)) {
      obj[key] = originalObject[key];
    }
    return obj;
  }, {});
}

app.get('/', (req, res) => {
  res.send('Welcome to the main stage of my fabulous Express server!');
});

app.get('/seasons', async (req, res) => {
  try {
    const seasons = await knex('seasons')
      .leftJoin('drag_queens', 'seasons.id', 'drag_queens.season_id')
      .select('seasons.id', 'seasons.name', 'seasons.year')
      .count('drag_queens.id as drag_queen_count')
      .groupBy('seasons.id')
  		.orderBy(orderBy);
	  res.render('seasons/index', { seasons: seasons });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
})

app.get('/seasons/new', async (req, res) => {
  try {
		res.render('seasons/new')
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
})

app.post('/seasons', async (req, res) => {
	try {
		const allowedKeys = ['name', 'year'];
	  const filteredParams = filterObject(req.body, allowedKeys);
	  await knex('seasons').insert(filteredParams);
    console.log(`A new season has been added with ID ${this.lastID}`);
	  res.redirect('/seasons');
	} catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/seasons/:id/edit', async (req, res) => {
  try {
	  const { id } = req.params;
	  const season = await knex('seasons').where({ id: id });
	  res.render('seasons/edit', { season: season[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/seasons/:id', async (req, res) => {
  try {
	  const { id } = req.params;
	  const season = await knex('seasons').where({ id: id });
	  const drag_queens = await knex('drag_queens').where({ season_id: id });
	  res.render('seasons/show', { season: season[0], drag_queens: drag_queens });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/seasons/:id', async (req, res) => {
	try {
	  const { id } = req.params;
		const allowedKeys = ['name', 'year'];
	  const filteredParams = filterObject(req.body, allowedKeys);
	  await knex('seasons').where({ id: id }).update(filteredParams);
	  console.log(`Season with ID ${id} has been updated`)
    res.redirect('/seasons');
	} catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/seasons/:id/delete', async (req, res) => {
	try {
	  const { id } = req.params;
	  await knex('seasons').where({ id: id }).del();
	  console.log(`Season with ID ${id} has been deleted`)
    res.redirect('/seasons');
	} catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/drag-queens', async (req, res) => {
  try {
    const drag_queens = await knex('drag_queens')
    	.leftJoin('seasons', 'seasons.id', 'drag_queens.season_id')
    	.select('drag_queens.name as drag_queen_name', 'drag_queens.id as drag_queen_id', 'seasons.name as season_name', '*')
    	.orderBy(orderBy.split(','));
	  res.render('drag_queens/index', { drag_queens: drag_queens });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/drag-queens/new', async (req, res) => {
  try {
    const seasons = await knex('seasons');
		res.render('drag_queens/new', { seasons: seasons })
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/drag-queens', async (req, res) => {
	try {
		const allowedKeys = ['name', 'age_during_season', 'hometown', 'placement', 'season_id'];
	  const filteredParams = filterObject(req.body, allowedKeys);
	  await knex('drag_queens').insert(filteredParams);
    console.log(`A new drag queen has been added with ID ${this.lastID}`);
	  res.redirect('/drag-queens');
	} catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/drag-queens/:id/edit', async (req, res) => {
  try {
	  const { id } = req.params;
	  const drag_queen = await knex('drag_queens').where({ id: id });
    const seasons = await knex('seasons');
	  res.render('drag_queens/edit', { drag_queen: drag_queen[0], seasons: seasons });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/drag-queens/:id', async (req, res) => {
	try {
	  const { id } = req.params;
		const allowedKeys = ['name', 'age_during_season', 'hometown', 'placement', 'season_id'];
	  const filteredParams = filterObject(req.body, allowedKeys);
	  await knex('drag_queens').where({ id: id }).update(filteredParams);
	  console.log(`Drag Queen with ID ${id} has been updated`)
    res.redirect('/drag-queens');
	} catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/drag-queens/:id/delete', async (req, res) => {
	try {
	  const { id } = req.params;
	  await knex('drag_queens').where({ id: id }).del();
	  console.log(`Drag Queen with ID ${id} has been deleted`)
    res.redirect('/drag-queens');
	} catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Express server sashaying on port ${port}`);
});
