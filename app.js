const { static } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
// mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// 引用 body-parser
const BodyParser = require("body-parser");
app.use(BodyParser.urlencoded({ extended: true }));
// 載入 Restaurant  model
const Restaurant = require("./models/restaurant");
const restaurant = require("./models/restaurant");
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

// 設定首頁路由
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});
// app.get("/search", (req, res) => {
//   let noResult = false;
//   const keyword = req.query.keyword;
//   const restaurants = restaurantsList.results.filter(
//     (restaurant) =>
//       restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
//       restaurant.category.includes(keyword)
//   );
//   if (restaurants.length === 0) {
//     noResult = true;
//   }
//   res.render("index", { restaurants, keyword, noResult });
// });

// add new restaurants
app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

//add new restaurant data submit page
app.post("/restaurants", (req, res) => {
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const google_map = req.body.map;
  const rating = req.body.rating;
  const description = req.body.description;

  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// restaurant detail
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
