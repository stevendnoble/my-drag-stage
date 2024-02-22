const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const seasons = require("./routes/seasons");
const drag_queens = require("./routes/drag_queens");
const port = 3000;

app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("layout", "layout");

app.get("/", (req, res) => {
	res.render("home");
});
app.use("/seasons", seasons);
app.use("/drag-queens", drag_queens);

app.listen(port, () => {
	console.log(`Express server sashaying on port ${port}`);
});
