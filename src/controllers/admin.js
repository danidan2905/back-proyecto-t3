const { StatusCodes } = require("http-status-codes");
const { addNewPaymentModel, addNewScheduleModel, addNewDoctorModel, addNewDoctorsOfficeModel, getAllDoctorsModel, getAllSchedulesModel, getAllDoctorsOfficeModel, getAllPaymentsModel, updatePaymentModel, deletePaymentModel, updateScheduleModel, deleteScheduleModel, addOrUpdateSpecialtiesModel, getAllSpecialtiesModel, updateDoctorModel, deleteDoctorModel, addOrUpdateMaintenanceModel, getAllMaintenanceModel, deleteSpecialtyModel, deleteMaintenanceModel, deleteOfficeModel, updateDoctorsOfficeModel, getDoctorsOfficeByIdModel, getScheduleByIdModel, getPaymentByIdModel, getDoctorByIdModel, getSpecialtyByIdModel, getMaintenanceByIdModel } = require("../model/admin.model");
const { findUserByToken } = require("../model/users.model");
const {addActionToLogbook} = require("../helpers/logbook");
const moment = require("moment");

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
            await addActionToLogbook(
                result.id,
                `Agregó nuevo consultorio: ${body.num_consultorio}`
            );
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

            await addActionToLogbook(
                result.id,
                `Agregó nuevo doctor: ${body.nombre_completo}`
            );


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

            await addActionToLogbook(
                result.id,
                `Agregó nuevo pago de $${body.monto} para el consultorio ${body.data.num_consultorio}`
            );

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

            await addActionToLogbook(
                result.id,
                `Agregó nuevo horario (${body.condicion}) para el consultorio ${body.data.num_consultorio.split(" - ")[1]}`
            );

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

            const find = await getDoctorsOfficeByIdModel(Number(body[0].id_consultorio));

            await addActionToLogbook(
                result.id,
                `${body.every((item) => item.update) ? 'Actualizó la lista de mantenimientos' : 'Agregó nuevo mantenimiento'} para el consultorio ${find.num_consultorio}`
            );

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

            await addActionToLogbook(
                result.id,
                `Agregó/Actualizó las especialidades`
            );

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

            const find = await getScheduleByIdModel(body.id);

            await addActionToLogbook(
                result.id,
                `Actualizó el horario del médico ${find.nombre_completo} en el consultorio ${find.num_consultorio}`
            );

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

            await addActionToLogbook(
                result.id,
                `Actualizó el pago del médico ${body.data.nombre_completo} para el consultorio ${body.data.num_consultorio}`
            );

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

            await addActionToLogbook(
                result.id,
                `Actualizó los datos del médico ${body.nombre_completo}, C.I: ${body.cedula}`
            );

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

            await addActionToLogbook(
                result.id,
                `Actualizó los datos del consultorio ${body.num_consultorio}`
            );

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
            const find = await getScheduleByIdModel(id);

            const response = await deleteScheduleModel(id);

            await addActionToLogbook(
                result.id,
                `Eliminó el horario del médico ${find.nombre_completo} en el consultorio ${find.num_consultorio}`
            );

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
            const find = await getPaymentByIdModel(id);
            console.log(find);
            const response = await deletePaymentModel(id, id_consultorios_medicos);

            await addActionToLogbook(
                result.id,
                `Eliminó el pago del médico ${find.nombre_medico} en el consultorio ${find.num_consultorio}`
            );

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
            const find = await getDoctorByIdModel(id);
            const response = await deleteDoctorModel(id);

            await addActionToLogbook(
                result.id,
                `Eliminó el médico ${find.nombre_completo}`
            );

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
            const find = await getSpecialtyByIdModel(id);
            const response = await deleteSpecialtyModel(id);
            
            await addActionToLogbook(
                result.id,
                `Eliminó la especialidad ${find.descripcion}`
            );

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
            const find = await getMaintenanceByIdModel(id);
            const response = await deleteMaintenanceModel(id);

            await addActionToLogbook(
                result.id,
                `Eliminó el mantenimiento (${moment(find.ult_fecha_mantenimiento).format("YYYY-MM-DD")}) del consultorio ${find.num_consultorio}`
            );

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
            const find = await getDoctorsOfficeByIdModel(id);
            const response = await deleteOfficeModel(id);

            await addActionToLogbook(
                result.id,
                `Eliminó el consultorio ${find.num_consultorio}`
            );

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