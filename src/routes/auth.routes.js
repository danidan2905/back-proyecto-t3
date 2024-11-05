const router = require("express").Router();

const { login, logout, getToken, blockUser, unlockUser, getSecurityQuestion, checkAnswer, modifyPassword } = require("../controllers/auth");

router.post("/login", login);
router.post("/logout", logout);
router.get("/token/:id_user", getToken);
router.get("/block-user/:usuario", blockUser);
router.post("/unlock-user/:id_user", unlockUser);

router.get("/security-question/:username", getSecurityQuestion);
router.post("/check-answer", checkAnswer);
router.post("/modify-password", modifyPassword);

module.exports = router;