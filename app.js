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

// 載入 method-override
const methodOverride = require("method-override");

// 引用路由器
const routes = require("./routes");
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
app.use(routes);

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
