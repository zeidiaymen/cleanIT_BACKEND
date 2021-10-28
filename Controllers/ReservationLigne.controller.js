const model = require("../Models/ReservationLigne.model");
const montModel = require("../Models/Monitoring.model");
var add = (req, res) => {
  let m = new model({
    name: req.body.name,
    Client: req.body.Client,
  });

  
  m.save();

  res.json("success");
};

var get = (req, res) => {
  model.find((err, data) => {
    if (err) console.log(err);
    else res.json(data);
  });
};
var del = (req, res) => {
  model.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) console.log(err);
    else res.json(data);
  });
};
module.exports = {
  add,
  get,
  del,
};
