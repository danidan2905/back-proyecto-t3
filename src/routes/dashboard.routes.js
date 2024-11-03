const { getHomeValues, getSummaryOffices } = require("../controllers/dashboard");

const router = require("express").Router();

router.get("/get-total-amount", getHomeValues);

router.get("/get-offices-summary", getSummaryOffices);

module.exports = router;