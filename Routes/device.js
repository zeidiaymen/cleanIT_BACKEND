const exp = require("express");
const route = exp.Router();
const device = require("../Controllers/device.controller");
route.post("/add", device.ad);
route.get("/get", device.get);
module.exports = route;
