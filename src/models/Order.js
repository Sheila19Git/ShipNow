const mongoose = require("mongoose");
const { ORDER_STATUS, ORDER_PRIORITY } = require("../constants");

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],

    status: {
        type: String,
        default: ORDER_STATUS.PENDING
    },

    priority: {
        type: String,
        default: ORDER_PRIORITY.MEDIUM
    }

});

module.exports = mongoose.model("Order", orderSchema);