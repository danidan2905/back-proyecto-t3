const router = require("express").Router();

const path = "/api";

router.use(`${path}/auth`, require("./auth.routes"));

module.exports = router;