express = require("express");

var router = express.Router();
var controller = require("../Controllers/user.controller");
var User = require("../Models/users.model");
//get All users
router.post("/mail", controller.emailSender);

router.use("/Uploads", express.static("Uploads"));

router.post("/passwordForgotten", controller.ForgetPassword);

router.get("/all", controller.getUsers);

//get user by id
router.get("/:id", controller.getSingleUser);

//post user
router.post("/register", controller.upload, controller.postUser);

//login
router.post("/login",controller.login);

//update with image
router.put("/update/:id", controller.upload, controller.updateUser);
// update without image
router.put("/updat/:id", controller.withoutPic);

//sendMail
router.post("/send", controller.verifyJWT, controller.emailSender);
router.get("/EmailFace/:email", (req, res) => {
  const email = req.params.email;

  User.find({ email: email }, async function (err, data) {
    if (err) throw err;
    if (data.length === 0) {
      return res.send("UserNotFound");
    } else {
      res.json(data);
    }
  });
});

//export
module.exports = router;
