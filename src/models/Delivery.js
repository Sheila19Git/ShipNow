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
    }

});

module.exports = mongoose.model("Delivery", deliverySchema);