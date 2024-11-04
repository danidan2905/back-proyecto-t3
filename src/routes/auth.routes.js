const router = require("express").Router();

const { login, logout, getToken, blockUser, unlockUser } = require("../controllers/auth");

router.post("/login", login);
router.post("/logout", logout);
router.get("/token/:id_user", getToken);
router.get("/block-user/:usuario", blockUser);
router.post("/unlock-user/:id_user", unlockUser);

module.exports = router;