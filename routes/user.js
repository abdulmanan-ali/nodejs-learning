const express = require('express');
const router = require('router');

router.get('/api/users', async (req, res) => {
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



router.get("/", (req, res) => {
    return res.send("on home");
})

router.get('/users', async (req, res) => {
    const allDbUsers = await userModel.find({})
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>\n`).join("")}
    </ul>
    `;
    return res.send(html)
})

router.get('/newdata', (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./user_data.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length })
    })
})

router.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user)
})

router
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

module.exports = router;