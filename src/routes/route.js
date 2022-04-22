const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

const tokenAuth = (req, res, next) => {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  //If no token is present in the request header return error
  if (!token) return res.send({ status: false, msg: "token must be present" });
  console.log(token);
  next();
};
router.post("/users", userController.createUser);

router.post("/login", userController.loginUser);

//The userId is sent by front end
router.get("/users/:userId", tokenAuth, userController.getUserData);

router.put("/users/:userId", tokenAuth, userController.updateUser);

router.put("/users1/:userId", tokenAuth, userController.deleteUser);
router.post("/users/:userId/posts",userController.postMessage)
module.exports = router; 