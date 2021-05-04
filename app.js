const { static } = require("express");
const express = require("express");
const port = 3000;
const exphbs = require("express-handlebars");
const BodyParser = require("body-parser");
const methodOverride = require("method-override");
// 引用路由器
const routes = require("./routes");
require("./config/mongoose");
const app = express();
// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(BodyParser.urlencoded({ extended: true }));
// setting static files
app.use(express.static("public"));
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride("_method"));
app.use(routes);

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
