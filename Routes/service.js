var exp = require("express");
var route = exp.Router();
var serv = require("../Controllers/service.controller");
route.get("/get", serv.get);
route.post("/post", serv.add);
route.get("/get/:id", serv.getById);
module.exports = route;
