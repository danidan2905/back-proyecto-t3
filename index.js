require("./src/dotenv/config");
const app = require('express')();
const express = require('express');
const router = require("./src/routes/routes")
const cors = require("cors");
const logger = require("morgan");

// CORS
app.use(cors({
    origin: "http://localhost:4200"
}));

// MIDDLEWARE
app.use(express.json());
app.use(logger("dev"));

// ROUTES
app.use("", router);

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING IN PORT ${process.env.PORT}`);
})
