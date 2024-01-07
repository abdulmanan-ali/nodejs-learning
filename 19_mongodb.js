// Schema - Define the structure
// Schema - Model
// Using Model we do Crud operation
const express = require('express');
const users = require('./user_data.json');
const fs = require('fs');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const app = express();

// connection with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/mynewdb').then(() => console.log('mongodb is connected')).catch((err) => console.log('MongdbError', err))
// Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true // same email not use in database
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String
    }
})
// Model 
const userModel = mongoose.model('user', userSchema) // first parameter 'user' is model name 

// ________express middleware 16 lec____________
app.use(express.urlencoded({ extended: false })); // middleware 1

app.use((req, res, next) => {
    // console.log("hello from middle ware 1");
    // return res.json({msgs: 'response'}) // it's stop to get a next request
    next();
})

app.get('/api/users', async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.job_Title || !body.gender) {
        return res.status(400).json({ res: "All fields are required" })
    }

    const result = await userModel.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_Title,
        gender: body.gender,
    })

    console.log(result);
    return res.status(201).json({ msg: "Success" })
});



app.get("/", (req, res) => {
    return res.send("on home");
})

app.get('/users', async (req, res) => {
    const allDbUsers = await userModel.find({})
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>\n`).join("")}
    </ul>
    `;
    return res.send(html)
})

app.get('/newdata', (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./user_data.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length })
    })
})

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user)
})

app
    .route('/users/:id')
    .get((req, res) => {
        return res.send("here is routing exist");
    })
    .patch(async (req, res) => {
        await userModel.findByIdAndUpdate(req.params.id, { lastName: "changed" })
        return res.json({ status: "success" })
    })
    .delete(async (req, res) => {
        await userModel.findByIdAndDelete(req.params.id)
        return res.json({ status: "success" })
    })



app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})