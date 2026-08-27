const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger/swagger");

const productRoutes = require("./routes/products.routes");
const userRoutes = require("./routes/users.routes");
const orderRoutes = require("./routes/orders.routes");
const deliveryRoutes = require("./routes/deliveries.routes");
const mockRoutes = require("./routes/mocks.routes");
const loggerRoutes = require("./routes/logger.routes");

const errorMiddleware = require("./errors/error.middleware");

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/mocks", mockRoutes);
app.use("/api/logger", loggerRoutes);

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.get("/", (req, res) => {
    res.send("ShipNow API funcionando");
});

app.use(errorMiddleware);

module.exports = app;