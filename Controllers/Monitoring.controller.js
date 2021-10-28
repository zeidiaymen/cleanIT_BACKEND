const model = require("../Models/Monitoring.model");

var del = (req, res) => {
  console.log(req.params.id);
  model.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) console.log(err);
    else res.json("deleted");
  });
};

var add = (req, res) => {
  let prod = new model({
    name: req.body.name,
    state: "in progress",
    date: req.body.date,
    Client_id: req.body.Client_id,
  });
  prod.save((err, data) => {
    if (err) console.log(err);
    else res.json(data);
  });
};
var update = (req, res) => {
  let prod = new model({
    _id: req.params.id,
    name: req.body.name,
    state: req.body.state,
  });
  model.findByIdAndUpdate(req.params.id, prod, (err, data) => {
    if (err) console.log(err);
    else res.json(data);
  });
};
var get = (req, res) => {
  model.find((err, data) => {
    if (err) console.log(err);
    else {
      console.log(req.params.id);
      var x = new model();
      x = data.filter((e) => {
        console.log(e);
        return e.Client_id === req.params.id;
      });
      console.log(x);
      res.json(x);
    }
  });
};
var getAll = (req, res) => {
  model.find((err, data) => {
    if (err) res.json(err);
    else res.json(data);
  });
};
module.exports = {
  update,
  add,
  get,
  getAll,
  del,
};
