const { static } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
// mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const restaurantsList = require("./restaurant.json");

// 取得資料庫連線狀態
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantsList.results });
});
app.get("/search", (req, res) => {
  let noResult = false;
  const keyword = req.query.keyword;
  const restaurants = restaurantsList.results.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.includes(keyword)
  );
  if (restaurants.length === 0) {
    noResult = true;
  }
  res.render("index", { restaurants, keyword, noResult });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantsList.results.find((restaurant) => {
    return restaurant.id.toString() === req.params.restaurant_id;
  });

  res.render("show", { restaurant: restaurant });
});
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
