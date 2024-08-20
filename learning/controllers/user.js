const { userAuth } = require("../models/userauth");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require('../service/auth');
const { set } = require("mongoose");

// const { shortId } = require("shortid");
// const nanoid = require('nanoid');


// const createNewUser = async (req, res) => {
//   const body = req.body;
//   //   if (
//   //     !body ||
//   //     !body.first_name ||
//   //     !body.last_name ||
//   //     !body.email ||
//   //     !body.job_Title ||
//   //     !body.gender
//   //   ) {
//   //     return res.status(400).json({ res: "All fields are required" });
//   //   }

//   const result = await userModel.create({
//     firstName: body.first_name,
//     lastName: body.last_name,
//     email: body.email,
//     jobTitle: body.job_Title,
//     gender: body.gender,
//   });

//   console.log(result);
//   return res.status(201).json({ msg: "user created successfully" });
// };

// const showAllUsers = async (req, res) => {
//   const users = await userModel.find({});
//   res.status(200).send(users);
// };

// const handleGetUserById = async (req, res) => {
//   const user = await userModel.findById(req.params.id);
//   if (!user) return res.status(400).send("not found");
// };

// const handleUpdateUserById = async (req, res) => {
//   await userModel.findByIdAndUpdate(req.params.id, { lastName: "changed" });
//   return res.json({ status: "user updated" });
// };

// const handleDeleteeUserById = async (req, res) => {
//   await userModel.findByIdAndDelete(req.params.id);
//   return res.json({ status: "user deleted" });
// };

//--------------------------Short URL's---------------------------
// const handleGenerateNewShortURL = async (req, res) => {
//   const body = req.body;
//   if (!body) return res.status(400).json({ error: "url is required" });
//   const shortId = nanoid(8);
//   await URL.create({
//     shortId: shortId,
//     redrectURL: body.url,
//   });
// };


const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await userAuth.create({
    name,
    email,
    password
  })
  return res.render('home')
};


const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userAuth.findOne({ email, password });
  if (!user) return res.render('login', { error: "Invalid user name and password" });

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect('/')

}

module.exports = {
  // createNewUser,
  // handleGetUserById, 
  // handleUpdateUserById,
  // handleDeleteeUserById,
  // showAllUsers,
  // handleGenerateNewShortURL,
  handleUserSignup,
  handleUserLogin
};
