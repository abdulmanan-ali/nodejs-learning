const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs");
// app.use(express.json())

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
    return res.json(users);
});

app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.get("/html/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    return res.send(html);
});

app.route("/api/users")

    .get((req, res) => {
        const body = req.body;
        users.push({ ...body, id: users.length + 1 });
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            return res.json({ status: "Data add successfully", id: users.length });
        });
    })

    .delete((req, res) => {
        const body = req.body;
        users.pop({ ...body, id: users.length - 1 });
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            return res.json({ status: "Data remove successfully", id: users.length });
        });
    })



app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
