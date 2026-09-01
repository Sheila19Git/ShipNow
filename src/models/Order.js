const mongoose = require("mongoose");

const { ORDER_STATUS, ORDER_PRIORITY } = require("../constants");

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: {
        type: [orderItemSchema],
        default: []
    },

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