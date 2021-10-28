var mong = require("mongoose");
var model = mong.Schema({
  name: String,
  object: String,
  body: String,
  Client_id: String,
  status: String,
});
module.exports = mong.model("Claim", model);
