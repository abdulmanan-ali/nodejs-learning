const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        blogId: {
            type: String,
            ref: "userauth",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userauth", 
            required: true,
        },
    }, { timestamps: true }
);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;