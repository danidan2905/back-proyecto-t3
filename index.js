require("./src/dotenv/config");
const app = require('express')();
const express = require('express');
const {router} = require('./src/routes/auth.routes');
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING IN PORT ${process.env.PORT}`);
})
