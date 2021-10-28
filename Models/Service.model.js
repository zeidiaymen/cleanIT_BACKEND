const mong = require("mongoose");
var model = new mong.Schema({
  Client_id: String,
  extra: [],
  frequency: String,
  name: String,
  date: Date,
});
module.exports = mong.model("serv", model);
