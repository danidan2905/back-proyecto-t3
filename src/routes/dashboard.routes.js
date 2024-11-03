const { getTotalAmount } = require("../controllers/dashboard");

const router = require("express").Router();

router.get("/get-total-amount", getTotalAmount);
router.get("/amount-last-month");
router.get("/amount-current-month");
router.get("/total-offices");
router.get("/total-offices-in-use");
router.get("/total-free-offices");

router.get("/offices-summary");

module.exports = router;