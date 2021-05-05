// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

router.get("/:type/:way", (req, res) => {
  const type = req.params.type;
  const way = req.params.way;
  let currentSelected = "";
  const typeObj = {
    name: {
      title: "店名",
      asc: "A -> Z",
      desc: "Z -> A",
    },
    rating: {
      title: "評分",
      descending: "高->低",
      ascending: "低->高",
    },
    category: {
      title: "餐廳類別",
      asc: " ",
    },
    location: {
      title: "餐廳地區",
      asc: "",
    },
  };
  currentSelected += `${typeObj[type].title} ${typeObj[type][way]}`;
  return Restaurant.find()
    .lean()
    .sort({ [type]: [way] })
    .then((restaurants) =>
      res.render("index", { restaurants, currentSelected })
    )
    .catch((error) => console.error(error));
});
module.exports = router;
