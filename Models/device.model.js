const mong = require("mongoose");
const model = mong.Schema({
  nbMobile: Number,
  nbDesktop: Number,
  nbTablette: Number,
});
module.exports = mong.model("Device", model);
