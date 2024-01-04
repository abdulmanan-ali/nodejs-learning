const express = require("express")


const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    return res.send("hello from the home page")
})

app.get("/about", (req, res) => {
    return res.send("from about page \t" +  req.query.name)
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})