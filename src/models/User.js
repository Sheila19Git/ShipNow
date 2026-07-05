const mongoose = require("mongoose");
const { USER_ROLES } = require("../constants");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        default: USER_ROLES.USER
    }
});

module.exports = mongoose.model("User", userSchema);