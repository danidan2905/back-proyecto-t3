const router = require("express").Router();

const { addDoctorsOffice, addNewPayment, getAllDoctorsOffice, addNewSchedule, addNewDoctor, getAllDoctors, getAllSchedules, getAllPayments, editPayment, deletePayment, editSchedule, deleteSchedule, addOrUpdateSpecialties, getAllSpecialties, editDoctor, deleteDoctor, getAllMaintenance, addOrUpdateMaintenance, deleteSpecialty, deleteMaintenance, deleteOffice, editDoctorsOffice } = require("../controllers/admin.js");

// AGREGAR
router.post("/add-doctors-office", addDoctorsOffice);
router.post("/add-new-payment", addNewPayment);
router.post("/add-new-schedule", addNewSchedule);
router.post("/add-new-doctor", addNewDoctor);

// ACTUALIZAR
router.post("/edit-payment", editPayment);
router.post("/edit-schedule", editSchedule);
router.put("/edit-doctor", editDoctor);
router.put("/edit-doctors-office", editDoctorsOffice);

// AGREGAR - ACTUALIZAR
router.post("/add-update-specialties", addOrUpdateSpecialties);
router.post("/add-update-maintenance", addOrUpdateMaintenance);

// LEER
router.get("/get-all-doctors-office", getAllDoctorsOffice);
router.get("/get-all-doctors", getAllDoctors);
router.get("/get-all-schedules", getAllSchedules);
router.get("/get-all-payments", getAllPayments);
router.get("/get-all-specialties", getAllSpecialties);
router.get("/get-all-maintenance", getAllMaintenance)

// ELIMINAR
router.delete("/delete-payment/:id/:id_cm", deletePayment);
router.delete("/delete-schedule/:id", deleteSchedule);
router.delete("/delete-doctor/:id", deleteDoctor);
router.delete("/delete-specialty/:id", deleteSpecialty);
router.delete("/delete-maintenance/:id", deleteMaintenance)
router.delete("/delete-office/:id", deleteOffice)

module.exports = router;

