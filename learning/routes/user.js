const express = require('express');
// const { createNewUser, handleGetUserById, handleUpdateUserById, handleDeleteeUserById, showAllUsers, handleGenerateNewShortURL } = require('../controllers/user.js')
const { handleUserSignup, handleUserLogin } = require('../controllers/user.js')

const userRouter = express.Router();
// const app = express()


// router.route('/').post(createNewUser).get(showAllUsers);

// router.route('/:id')
//     .get(handleGetUserById)
//     .patch(handleUpdateUserById)
//     .delete(handleDeleteeUserById)

// ---------------short URL's------------------------------

// router.route('/').post(handleGenerateNewShortURL)

// ---------------user auth------------------------------

userRouter.route('/signup').post(handleUserSignup)
userRouter.route('/login').post(handleUserLogin)


module.exports = userRouter;



// router.get('/', async (req, res) => {
//     const allDbUsers = await userModel.find({})
//     const html = `
//     <ul>
//     ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>\n`).join("")}
//     </ul>
//     `;
//     return res.send(html)
// })

// router.get("/", (req, res) => {
//     return res.send("on home");
// })
// router.get('/newdata', (req, res) => {
//     const body = req.body;
//     users.push({ ...body, id: users.length + 1 });
//     fs.writeFile('./user_data.json', JSON.stringify(users), (err, data) => {
//         return res.json({ status: "success", id: users.length })
//     })
// })

// router.get('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user)
// })