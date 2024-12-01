const { getAllSecurityQ, addUser, getAllUsers, editUser, deleteUser, getAllLogbook } = require("../controllers/superadmin");

const router = require("express").Router();

// LEER
router.get("/get-all-security-q", getAllSecurityQ);
router.get("/get-all-users", getAllUsers);
router.get("/get-all-logbook", getAllLogbook)

// CREAR
router.post("/add-user", addUser);

// ACTUALIZAR
router.post("/edit-user", editUser);

// ELIMINAR
router.post("/delete-user/:id", deleteUser);

module.exports = router;