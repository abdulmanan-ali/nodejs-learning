const express = require("express");
const { handleUserSignup, handleUserSignin, logout } = require("../controllers/user");

const router = express.Router();

router
  .route("/signup")
  .get((req, res) => {
    return res.render("signup");
  })
  .post(handleUserSignup);

router
  .route("/signin")
  .get((req, res) => {
    return res.render("signin");
  })
  .post(handleUserSignin);

  router
  .route("/logout")
  .get(logout);

module.exports = router;
