const mongoose = require("mongoose");
const { MONGODB_URI } = require("./env.config");

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;