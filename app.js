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

// 載入 method-override
const methodOverride = require("method-override");
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
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride("_method"));
// 設定首頁路由
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

app.get("/search", (req, res) => {
  let noResult = false;
  const keyword = req.query.keyword;
  return Restaurant.find({
    $or: [
      { name: { $regex: `${keyword}`, $options: "$i" } },
      { category: { $regex: `${keyword}`, $options: "$i" } },
    ],
  })
    .lean()
    .then((restaurants) =>
      res.render("index", { restaurants, keyword, noResult })
    );
});

// add new restaurants
app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

//add new restaurant data submit page
app.post("/restaurants", (req, res) => {
  console.log(req.body);
  const restaurant = req.body;
  return Restaurant.create(restaurant)
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

// update restaurant detail
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

app.put("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const google_map = req.body.map;
  const rating = req.body.rating;
  const description = req.body.description;

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name;
      restaurant.name_en = name_en;
      restaurant.category = category;
      restaurant.image = image;
      restaurant.location = location;
      restaurant.phone = phone;
      restaurant.google_map = google_map;
      restaurant.rating = rating;
      restaurant.description = description;
      return restaurant.save();
    })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

//delete restaurant
app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
