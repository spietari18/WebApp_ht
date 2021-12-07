const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Comment
let commentSchema = new Schema({
    user: mongoose.ObjectId,        // Comments author
    comment: String,                // Comment text
    timestamp: Date,                // Comments original timestamp
    lastedit: Date                  // Last edited timestamp
});

module.exports = mongoose.model("comments", commentSchema);
