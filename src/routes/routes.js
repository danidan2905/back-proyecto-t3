const router = require("express").Router();

const path = "/api";

router.use(`${path}/auth`, require("./auth.routes"));
router.use(`${path}/dashboard`, require("./dashboard.routes"));
router.use(`${path}/admin`, require("./admin.routes"));
router.use(`${path}/superadmin`, require("./superadmin.routes"));

module.exports = router;