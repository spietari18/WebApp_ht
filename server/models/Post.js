const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema({
    user: mongoose.ObjectId,
    items: [String]
});

module.exports = mongoose.model("posts", postSchema);
