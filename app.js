//Declaration:
var express = require("express");
var mongoose = require("mongoose");
var app = express();
var cors = require("cors");
var logger = require("morgan");
var config = require("./dbConfig.json");
var port = process.env.PORT || 3000;
var usersRoute = require("./Routes/users");
var bp = require("body-parser");
var montRoute = require("./Routes/Monitoring");
var servRoute = require("./Routes/service");
var commandRoute = require("./Routes/CommandLigne");
var claimRoute = require("./Routes/claim");
var devRoute = require("./Routes/device");
var test = require("./Routes/test");
// Cors

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "DELETE", "PUT"],

  allowedHeaders: "*",
};
app.use(cors());
//Logger
app.use(logger("dev"));
//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Database Connection :

mongoose
  .connect(config.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB connected"))
  .catch(() => console.log("DB connection failed"));
//Server Connection :
app.listen(port, () => {
  console.log("Server connected on port : %s", port);
});
///

app.use("/user", usersRoute);
app.use("/mont", montRoute);
app.use("/serv", servRoute);
app.use("/Commands", commandRoute);
app.use("/claim", claimRoute);
app.use("/device", devRoute);
app.use("/", test);

app.get("/", (req, res) => {
  res.json("success");
});
//app.use(bp.json());
