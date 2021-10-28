const exp = require("express");
const route = exp.Router();
const claim = require("../Controllers/model.controller");
route.post("/add", claim.add);
route.get("/get/:id", claim.get);
route.get("/get/", claim.getAll);
route.put("/update/:id", claim.update);

module.exports = route;
