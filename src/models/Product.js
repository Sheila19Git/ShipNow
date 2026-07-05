const mongoose = require("mongoose");
const { PRODUCT_STATUS } = require("../constants");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        default: PRODUCT_STATUS.AVAILABLE
    }
});

module.exports = mongoose.model("Product", productSchema);