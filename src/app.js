const express = require("express");
const productRoutes = require("./routes/products.routes");
const userRoutes = require("./routes/users.routes");

const app = express();

app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("ShipNow API funcionando");
});

module.exports = app;