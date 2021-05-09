// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

router.get("/", (req, res) => {
  let sort = req.query.sort;
  sorted = sort.split("-");
  const type = sorted[0];
  const way = sorted[1];

  return Restaurant.find()
    .lean()
    .sort({ [type]: [way] })
    .then((restaurants) => res.render("index", { restaurants, sort }))
    .catch((error) => console.error(error));
});
module.exports = router;
