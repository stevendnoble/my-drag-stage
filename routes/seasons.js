const express = require("express");
const router = express.Router();

const {
  getAllSeasonsWithCounts,
  addNewObject,
  getObjectById,
  getDragQueensBySeasonId,
  updateObject,
  deleteObject,
} = require("../utils/serverUtils.js");

router.get("/", async (req, res) => {
  try {
    const orderBy = req.query.order_by || "seasons.id";
    const seasons = await getAllSeasonsWithCounts(orderBy);
    res.render("seasons/index", { seasons: seasons });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/new", async (req, res) => {
  try {
    res.render("seasons/new");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    await addNewObject("seasons", req.body);
    res.redirect("/seasons");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const season = await getObjectById("seasons", req.params.id);
    res.render("seasons/edit", { season: season[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const season = await getObjectById("seasons", req.params.id);
    const drag_queens = await getDragQueensBySeasonId(req.params.id);
    res.render("seasons/show", { season: season[0], drag_queens: drag_queens });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/:id", async (req, res) => {
  try {
    await updateObject("seasons", req);
    res.redirect("/seasons");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    await deleteObject("seasons", req.params.id);
    res.redirect("/seasons");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
