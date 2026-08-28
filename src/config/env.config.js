const dotenv = require("dotenv");

const envFile =
    process.env.NODE_ENV === "test" ? ".env.test" : ".env";

dotenv.config({
    path: envFile,
    override: true
});

const requiredVariables = ["PORT", "MONGODB_URI", "NODE_ENV"];

requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
        throw new Error(`Falta la variable de entorno: ${variable}`);
    }
});

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV
};