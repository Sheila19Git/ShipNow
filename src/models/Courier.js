const mongoose = require("mongoose");

const courierSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    available: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model("Courier", courierSchema);