const express = require("express");
var route = express.Router();
var Res = require("../Controllers/ReservationLigne.controller");
route.post("/post", Res.add);
route.get("/get", Res.get);
route.delete("/:id", Res.del);
module.exports = route;
