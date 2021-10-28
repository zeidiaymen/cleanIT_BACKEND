const mong = require("mongoose");
var route = mong.Schema({
  name: String,
  Client: String,
});
module.exports = mong.model("ReservLigne", route);
