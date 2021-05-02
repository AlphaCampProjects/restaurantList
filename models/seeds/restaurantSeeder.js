const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// 載入 restaurant model
const Restaurant = require("../restaurant");
const restaurantsList = require("../restaurant.json");

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
  for (let i = 0; i < restaurantsList.results.length; i++) {
    Restaurant.create({
      id: restaurantsList.results[i].id,
      name: restaurantsList.results[i].name,
      name_en: restaurantsList.results[i].name_en,
      category: restaurantsList.results[i].category,
      image: restaurantsList.results[i].image,
      location: restaurantsList.results[i].location,
      phone: restaurantsList.results[i].phone,
      google_map: restaurantsList.results[i].google_map,
      rating: restaurantsList.results[i].rating,
      description: restaurantsList.results[i].description,
    });
  }
  console.log("done");
});
