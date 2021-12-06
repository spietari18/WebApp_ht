const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Post
let postSchema = new Schema({
    user: mongoose.ObjectId,            // Posts author
    post: String,                       // Post text
    comments: [mongoose.ObjectId],      // Posts comments
    timestamp: String,                  // Posts original timestamp
    lastedit: String                    // Last edited timestamp
});

module.exports = mongoose.model("posts", postSchema);
