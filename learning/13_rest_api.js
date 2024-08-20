const express = require('express');
const users = require('./user_data.json');
const fs = require('fs');


const port = process.env.PORT || 3000;
const app = express();

// ________express middleware 16 lec____________
app.use(express.urlencoded({ extended: false })); // middleware 1

app.use((req, res, next) => {
    // console.log("hello from middle ware 1");
    // return res.json({msgs: 'response'}) // it's stop to get a next request
    next();
})


app.get("/", (req, res) => {
    return res.send("on home");
})

app.get('/users', (req, res) => {

    // ________17 headers lec____________
    res.setHeader("X-My name", "Manan") // it is a best practice to use the X in custom headers
    return res.json(users)
    // const html = `
    // <ul>
    // ${users.map((user) => `<li>${user.first_name}</li>\n`)}
    // </ul>
    // `;
    // res.send(html)
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
    .route('/about')
    .get((req, res) => {
        return res.send("here is routing exist");
    })
    .put((req, res) => {
        return res.json({ status: "pending" })
    })
    .delete((req, res) => {
        return res.json({ status: "pending" })
    })



app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})