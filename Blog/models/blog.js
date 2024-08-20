const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true
        },
        coverImageURL: {
            type: String,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userauth", 
            required: true,
        },
    }, { timestamps: true }
);

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;