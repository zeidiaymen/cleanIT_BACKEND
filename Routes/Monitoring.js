var express = require("express");
var route = express.Router();
var mont = require("../Controllers/Monitoring.controller");
route.post("/add", mont.add);
route.get("/get/:id", mont.get);
route.get("/get", mont.getAll);
route.put("/put/:id", mont.update);
route.delete("/:id", mont.del);
module.exports = route;
