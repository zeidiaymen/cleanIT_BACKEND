express = require("express");
var route = express();
route.get("/", (req, res) => {
  res.json("sucess");
});
module.exports = route;
