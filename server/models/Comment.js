const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Comment
let commentSchema = new Schema({
    user: mongoose.ObjectId,        // Comments author
    comment: String,                // Comment text
    timestamp: String,              // Comments original timestamp
    lastedit: String                // Last edited timestamp
});

module.exports = mongoose.model("comments", commentSchema);
