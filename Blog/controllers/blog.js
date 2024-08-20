const Blog = require("../models/blog");
const Comment = require("../models/comment");
const multer = require("multer");
const path = require("path");
const express = require("express");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()} - ${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router
    .route("/add-new")
    .get((req, res) => {
        return res.render("blog", {
            user: req.user,
        });
    })
    .post(upload.single("coverImage"), async (req, res) => {
        const { title, body } = req.body;

        try {
            const blog = await Blog.create({
                title,
                body,
                createdBy: req.user._id,
                coverImageURL: `/uploads/${req.file.filename}`,
            });
            return res.redirect(`/blog/${blog._id}`);
        } catch (error) {
            console.error("Error creating blog:", error);
            res.status(500).send("Internal Server Error");
        }
    });

router
    .route("/:id")
    .get(async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id).populate("createdBy");
            const comments = await Comment.find({ blogId: req.params.id }).populate(
                "createdBy"
            );
            return res.render("blogContent", {
                user: req.user,
                blog,
                comments,
            });
        } catch (error) {
            console.error("Error fetching blog or comments:", error);
            res.status(500).send("Internal Server Error");
        };
    })
    .post(async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id).populate("createdBy");
            await Comment.create({
                content: req.body.content,
                blogId: req.params.id,
                createdBy: req.user._id,
            });
            return res.redirect(`/blog/${blog.id}`);
        } catch (error) {
            console.error("Error posting comment:", error);
            res.status(500).send("Internal Server Error");
        }
    });

module.exports = router;
