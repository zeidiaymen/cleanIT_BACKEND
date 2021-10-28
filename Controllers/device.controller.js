const model = require("../Models/device.model");
var ad = (req, res) => {
  let p = new model({
    nbMobile: req.body.nbMobile,
    nbDesktop: req.body.nbDesktop,
    nbTablette: req.body.nbTablette,
  });
  p.save();
  res.json("add with sucess");
};
var get = (req, res) => {
  model.find((err, data) => {
    if (err) consol.log(err);
    else res.json(data);
  });
};
module.exports = {
  ad,
  get,
};
