const { StatusCodes } = require("http-status-codes");
const { addNewPaymentModel, addNewScheduleModel, addNewDoctorModel, addNewDoctorsOfficeModel, getAllDoctorsModel, getAllSchedulesModel, getAllDoctorsOfficeModel, getAllPaymentsModel, updatePaymentModel, deletePaymentModel, updateScheduleModel, deleteScheduleModel, addOrUpdateSpecialtiesModel, getAllSpecialtiesModel, updateDoctorModel, deleteDoctorModel, addOrUpdateMaintenanceModel, getAllMaintenanceModel, deleteSpecialtyModel, deleteMaintenanceModel, deleteOfficeModel, updateDoctorsOfficeModel } = require("../model/admin.model");
const { findUserByToken } = require("../model/users.model");

const getAllDoctorsOffice = async (req, res) => {
    try{
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await getAllDoctorsOfficeModel();
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const getAllDoctors = async (req, res) => {
    try{
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await getAllDoctorsModel();
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const getAllSchedules = async (req, res) => {
    try{
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await getAllSchedulesModel();
            console.log(response);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const getAllPayments = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await getAllPaymentsModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const getAllSpecialties = async (req, res) => {
    try{
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await getAllSpecialtiesModel();
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const getAllMaintenance = async (req, res) => {
    try{
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await getAllMaintenanceModel();
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const addDoctorsOffice = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await addNewDoctorsOfficeModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false,
            message: error.toString()
        });
    }
};

const addNewDoctor = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await addNewDoctorModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const addNewPayment = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await addNewPaymentModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const addNewSchedule = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await addNewScheduleModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const addOrUpdateMaintenance = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await addOrUpdateMaintenanceModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const addOrUpdateSpecialties = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await addOrUpdateSpecialtiesModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const editSchedule = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await updateScheduleModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const editPayment = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await updatePaymentModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const editDoctor = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await updateDoctorModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const editDoctorsOffice = async (req, res) => {
    try{
        const body = req.body;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await updateDoctorsOfficeModel(body);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const deleteSchedule = async (req, res) => {
    try{
        const id = req.params.id;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await deleteScheduleModel(id);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const deletePayment = async (req, res) => {
    try{
        const id = req.params.id;
        const id_consultorios_medicos = req.params.id_cm;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await deletePaymentModel(id, id_consultorios_medicos);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const deleteDoctor = async (req, res) => {
    try{
        const id = req.params.id;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await deleteDoctorModel(id);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const deleteSpecialty = async (req, res) => {
    try{
        const id = req.params.id;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await deleteSpecialtyModel(id);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const deleteMaintenance = async (req, res) => {
    try{
        const id = req.params.id;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await deleteMaintenanceModel(id);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

const deleteOffice = async (req, res) => {
    try{
        const id = req.params.id;
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const response = await deleteOfficeModel(id);
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: response
            });
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                msg: "Permisos insuficientes"
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: false
        });
    }
};

module.exports = {
    addDoctorsOffice,
    addNewPayment,
    getAllDoctorsOffice,
    addNewSchedule,
    addNewDoctor,
    getAllDoctors,
    getAllSchedules,
    getAllPayments,
    editPayment,
    deletePayment,
    editSchedule,
    deleteSchedule,
    addOrUpdateSpecialties,
    getAllSpecialties,
    editDoctor,
    deleteDoctor,
    getAllMaintenance,
    addOrUpdateMaintenance,
    deleteSpecialty,
    deleteMaintenance,
    deleteOffice,
    editDoctorsOffice
};