const mongoose = require("mongoose");

const {
    ORDER_STATUS,
    ORDER_PRIORITY
} = require("../constants");

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
    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: {
        type: [orderItemSchema],
        default: [],
        validate: {
            validator: (products) => products.length > 0,
            message: "El pedido debe contener al menos un producto"
        }
    },

    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.PENDING
    },

    priority: {
        type: String,
        enum: Object.values(ORDER_PRIORITY),
        default: ORDER_PRIORITY.MEDIUM
    }
});

module.exports = mongoose.model("Order", orderSchema);