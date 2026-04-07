require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.use("/api/products", require("./routes/products"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

module.exports = app;
