const config = require("./config/env.config");
const app = require("./app");
const connectDB = require("./config/database");
const logger = require("./config/logger");

const startServer = async () => {
    try {
        await connectDB();

        app.listen(config.PORT, () => {
            logger.info(`Servidor ShipNow escuchando en el puerto ${config.PORT}`);
        });
    } catch (error) {
        logger.fatal(`No se pudo iniciar el servidor: ${error.message}`);
        process.exit(1);
    }
};

startServer();