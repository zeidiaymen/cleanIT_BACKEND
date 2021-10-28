const model = require("../Models/Service.model");
const montModel = require("../Models/Monitoring.model");
const comm = require("../Models/ReservationLigne.model");

var add = (req, res) => {
  var k = Date.parse(req.body.date);
  let s = new model({
    CLient_id: req.body.Client_id,
    name: req.body.name,
    frequency: req.body.frequency,
    extra: req.body.extra,
    date: k,
  });
  s.save((err, data) => {
    if (err) res.json(err);
    else {
      console.log(data);
    }
  });

  let m = new comm({
    name: req.body.name,

    Client: req.body.Client,
  });
  m.save((err, data) => {
    if (err) res.json(err);
    else {
      res.json(data);
      console.log(data);
    }
  });
};
var get = (req, res) => {
  model.find((er, data) => {
    if (er) console.log(er);
    else res.json(data);
  });
};
var getById = (req, res) => {
  model.findById(req.params.id, (err, data) => {
    if (err) console.log(err);
    else res.json(data);
  });
};
module.exports = {
  get,
  add,
  getById,
};
