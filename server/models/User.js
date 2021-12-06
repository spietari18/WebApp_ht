const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// User
let userSchema = new Schema({
    email: {type: String},          // Users email
    password: {type: String}        // Users passwords hash
});

module.exports = mongoose.model("users", userSchema);
