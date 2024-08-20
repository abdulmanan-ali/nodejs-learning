const express = require('express');
const userAuth = require("../models/userauth");

const staticRouter = express.Router();

staticRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

staticRouter.get("/login", (req, res) => {
  return res.render("login");
});

staticRouter.get("/", (req, res) => {
  return res.render("home");
});

module.exports = staticRouter;
