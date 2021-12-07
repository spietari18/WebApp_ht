const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Post
let postSchema = new Schema({
    user: mongoose.ObjectId,            // Posts author
    post: String,                       // Post text
    comments: [mongoose.ObjectId],      // Posts comments
    timestamp: Date,                    // Posts original timestamp
    lastedit: Date                      // Last edited timestamp
});

module.exports = mongoose.model("posts", postSchema);
