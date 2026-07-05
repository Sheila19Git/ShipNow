const app = require("./app");
const connectDB = require("./config/database");
const config = require("./config/env.config");

const startServer = async () => {
    await connectDB();

    app.listen(config.PORT, () => {
        console.log(`Servidor corriendo en el puerto ${config.PORT}`);
    });
};

startServer();