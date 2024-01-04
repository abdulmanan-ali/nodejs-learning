const express = require('express');

const port = process.env.PORT || 3000;
const app = express();


app.get("/api/users", (req, res) => {
    return res.status(200).send("on home");
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})