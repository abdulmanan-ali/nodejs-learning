const express = require("express");
const { connectToDB } = require("./connection.js");
const path = require("path")

// Importing routers with unique names
const userRouter = require("./routes/user.js");
const staticRouter = require("./routes/staticRouter.js");

const app = express();
const PORT = 3000;

connectToDB("mongodb://127.0.0.1:27017/mynewdb")
    .then(() => console.log("mongoDB connected successfully"))
    .catch(() => console.log("DB connection Error"));

app.set("view engine", "ejs");  // Fixed typo: "enjine" -> "engine"
app.set("views", path.resolve('./views'))

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the correct routers with their unique names
app.use("/", userRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
