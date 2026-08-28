const mongoose = require("mongoose");
const { DELIVERY_STATUS } = require("../constants");

const deliverySchema = new mongoose.Schema({

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    courier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courier",
        required: true
    },

    status: {
        type: String,
        default: DELIVERY_STATUS.ASSIGNED
    },

    receipt: {
        type: {
            originalName: {
                type: String,
                required: true
            },
            generatedName: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            },
            mimeType: {
                type: String,
                required: true
            },
            size: {
                type: Number,
                required: true
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        },
        required: false
    }

});

module.exports = mongoose.model("Delivery", deliverySchema);