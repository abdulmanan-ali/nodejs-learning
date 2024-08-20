const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

// const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
    return res.render("home");
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

app.post("/uploads", upload.fields([{ name: "profileImage" }, { name: "coverImage" }]), (req, res) => {
    console.log(req.file, req.body);
    return res.redirect("/");
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
