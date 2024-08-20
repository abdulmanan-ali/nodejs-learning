const { urlencoded } = require("body-parser");
const express = require("express");
const connectToDB = require("./connection");
const path = require("path");
const router = require("./routes/user");
const blogRouter = require("./controllers/blog");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const Blog = require("./models/blog");

connectToDB("mongodb://127.0.0.1:27017/mynewdb")
  .then(() => console.log("mongoDB connected successfully"))
  .catch(() => console.log("DB connection Error"));

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/user", router);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(PORT, () => {
  console.log(`Server Started at PORT:${PORT}`);
});
