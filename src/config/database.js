const mongoose = require("mongoose");
const config = require("./env.config");
const logger = require("./logger");

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        logger.info("Conexión a MongoDB establecida");
    } catch (error) {
        logger.fatal(`Error conectando a MongoDB: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;