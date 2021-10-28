const model = require("../Models/Claim.model");

var add = (req, res) => {
  let item = new model({
    name: req.body.name,
    object: req.body.object,
    body: req.body.body,
    Client_id: req.body.Client_id,
    status: "in progress",
  });
  item.save();
  res.json("success");
};

var get = (req, res) => {
  model.find((err, data) => {
    if (err) console.log(err);
    else {
      var x = new model();
      x = data.filter((x) => {
        return x.Client_id === req.params.id;
      });
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

var update = (req, res) => {
  let prod = new model({
    _id: req.params.id,
    name: req.body.name,
    status: req.body.status,
  });
  model.findByIdAndUpdate(req.params.id, prod, (err, data) => {
    if (err) console.log(err);
    else res.json(data);
  });
};

module.exports = {
  update,
  add,
  get,
  getAll,
};
