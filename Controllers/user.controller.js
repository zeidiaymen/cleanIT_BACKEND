// Variables
const model = require("../Models/users.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs");
//const bcrypt = require("bcrypt");
require("dotenv").config();
const multer = require("multer");
var path = require("path");
// End Declaration
//get all method
var getUsers = async (req, res) => {
  model.find((err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
};

// get single user
var getSingleUser = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  let id = req.iduser;
  var role = "";
  await model
    .findById(id)
    .then((data) => {
      role = data.role;
    })
    .catch((err) => console.log(err));

  model.findById(req.params.id).then((data) => res.json(data));
};

//register
var postUser = async (req, res) => {
  // let salt = await bcrypt.genSalt();
  //var hashPassword = await bcrypt.hash(req.body.password, salt);
  let user = new model({
    name: req.body.name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phonr_number: req.body.phonr_number,
    role: "user",
    img: req.file.filename,
  });

  user.save((err, data) => {
    if (err) res.json(err);
    else {
      res.json(data);
    }
  });
};

var login = (req, res) => {
  console.log(req.body.email, req.body.password);
  model.find((err, data) => {
    if (err) {
      res.json("erreur");
    } else {
      const user = data.filter((x) => {
        return x.email == req.body.email && x.password == req.body.password;
      });
      console.log(user);
      if (user.length > 0) {
        const token = jwt.sign({ user }, "algorithm");

      
        console.log(user[0]._id, "hahaha");
        var js = {
          token: token,
          id: user[0]._id,
        };

        res.json(js);
      } else {
        res.json("not allowed");
      }
    }
  });
};

var updateUser = async (req, res) => {
  var path = "";
  await model.findById(req.params.id).then((data) => (path = data.img));
  const paths = '../Uploads/'+path

try {
  fs.unlinkSync(paths)
 
} catch(err) {
  console.error(err)
}

  var user = new model({
    _id: req.params.id,
    name: req.body.name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phonr_number: req.body.phonr_number,
    img: req.file.filename,
  });

  model.findByIdAndUpdate(req.params.id, user, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).json(err.message);
    } else {
      res.status(200).json(data);
    }
  });
};

var ForgetPassword = async (req, res) => {
  const email = req.body.email;
  var user = new model();
  await model
    .findOne({ email: email })
    .then((data) => {
      user = data;
    })
    .catch((err) => res.json(err));
  if (user !== null) {
    await transporter.sendMail({
      from: "CleanIT", // sender address
      to: user.email, // list of receivers
      subject: "Security CleanIT Team", // Subject line
      text: "SECURITY", // plain text body
      html:
        "<b>EMAIL </b> :" +
        user.email +
        " <br> <b> PASSWORD :</b>" +
        user.password, // html body
    });
    res.json("sended with sucess");
  }
};

var emailSender = async (req, res) => {
  await transporter.sendMail({
    from: "CleanIT", // sender address
    to: req.body.to, // list of receivers
    subject: "RE CLAIM", // Subject line
    text: req.body.html, // plain text body
    html: "<p>" + req.body.html + "</p>",
  });

  res.json("email send with sucess");
};
//////////////////// UTILS ///////////////
function verifyJWT(req, res, next) {
  const header = req.headers["authorization"];
  if (header) {
    const spliter = header.split(" ");
    const token = spliter[1];

    jwt.verify(token, "algorithm", (err, enc) => {
      if (err) {
        console.log("false token");
        res.status(403).end();
      } else {
        req.iduser = enc.user[0]._id;

        next();
      }
    });
  } else {
    res.status(403);
    next();
  }
}
//Config
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.user, // generated ethereal user
    pass: process.env.pass, // generated ethereal password
  },
});

//Upload Image
var Storage = multer.diskStorage({
  destination: "Uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({
  storage: Storage,
}).single("img");

var withoutPic = (req, res) => {
  var user = new model({
    _id: req.params.id,
    name: req.body.name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phonr_number: req.body.phonr_number,
    img: req.body.img,
  });

  model.findByIdAndUpdate(req.params.id, user, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).json(err.message);
    } else {
      res.status(200).json(data);
    }
  });
};

//exports
module.exports = {
  upload,
  getUsers,
  getSingleUser,
  postUser,
  login,
  updateUser,
  verifyJWT,
  emailSender,
  withoutPic,
  ForgetPassword,
};
