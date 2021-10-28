var mongoose = require("mongoose");
var model = new mongoose.Schema({
  Client_id: String,
  name: String,
  state: String,
  date: Date,
});
module.exports = mongoose.model("monitoring", model);
