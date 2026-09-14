const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Health check OK",
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime()
  });
});

module.exports = router;