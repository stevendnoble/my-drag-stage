const express = require("express");
const router = express.Router();

const {
	getAllObjects,
	getAllDragQueensWithSeasons,
	addNewObject,
	getObjectById,
	updateObject,
	deleteObject,
} = require("../utils/serverUtils.js");

router.get("/", async (req, res) => {
	try {
		const drag_queens = await getAllDragQueensWithSeasons(req.query.order_by);
		res.render("drag_queens/index", { drag_queens: drag_queens });
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.get("/new", async (req, res) => {
	try {
		const seasons = await getAllObjects("seasons");
		res.render("drag_queens/new", { seasons: seasons });
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.post("/", async (req, res) => {
	try {
		await addNewObject("drag_queens", req.body);
		res.redirect("/drag-queens");
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.get("/:id/edit", async (req, res) => {
	try {
		const drag_queen = await getObjectById("drag_queens", req.params.id);
		const seasons = await getAllObjects("seasons");
		res.render("drag_queens/edit", {
			drag_queen: drag_queen[0],
			seasons: seasons,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.post("/:id", async (req, res) => {
	try {
		await updateObject("drag_queens", req);
		res.redirect("/drag-queens");
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.post("/:id/delete", async (req, res) => {
	try {
		await deleteObject("drag_queens", req.params.id);
		res.redirect("/drag-queens");
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
