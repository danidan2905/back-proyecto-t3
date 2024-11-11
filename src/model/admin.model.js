const db = require("../../knexfile");

const addNewPaymentModel = async (body) => {
    const result = await db("ccvma.historial_pagos").insert({
        id_consultorios_medicos: body.id_consultorios_medicos,
        fecha_corte: body.fecha_corte,
        fecha_pago: body.fecha_pago,
        monto: body.monto,
        restante: body.restante
    });

    console.log(body);

    await db("ccvma.consultorios_medicos").where({
        id: body.id_consultorios_medicos
    }).update({
        solvente: body.solvente
    });
    
    return result;
};

const updatePaymentModel = async (body) => {
    console.log(body);
    const old_id = body?.old_id_consultorios_medicos;

    if (old_id){
        await db("ccvma.consultorios_medicos").where({
            id: old_id
        }).update({
            solvente: 0
        })
    }

    const result = await db("ccvma.historial_pagos").where({
        id: body.id_payment
    }).update({
        id_consultorios_medicos: body.id_consultorios_medicos,
        fecha_corte: body.fecha_corte,
        fecha_pago: body.fecha_pago,
        monto: body.monto,
        restante: body.restante
    });

    await db("ccvma.consultorios_medicos").where({
        id: body.id_consultorios_medicos
    }).update({
        solvente: body.solvente
    });

    return result;
};

const addNewDoctorModel = async (body) => {
    console.log(body);

    const result = await db("ccvma.medicos").insert({
        nombre_completo: body.nombre_completo,
        cedula: body.cedula,
        num_telefono: body.num_telefono,
        correo: body.correo
    });

    await db("ccvma.especialidad_medicos").insert({
        id_medico: result[0],
        id_especialidad: body.especialidad
    });

    return result;
};

const addNewDoctorsOfficeModel = async (body) => {
    const find = await db("ccvma.consultorios").select("*").where({
        num_consultorio: body.num_consultorio
    }).first();
    if ((find?.id)){
        throw new Error(`El consultorio con el número ${body.num_consultorio} ya existe`);
    }
    const result = await db("ccvma.consultorios").insert({
        num_consultorio: body.num_consultorio,
        observaciones: body.observaciones || ''
    });
    return result;
};

const addOrUpdateSpecialtiesModel = async (body) => {
    for (let i = 0; i < body.length; i++){
        try{
            const update = await db("ccvma.especialidad").select("*").where({
                id: body[i].id
            });
            if (update.length){
                await db("ccvma.especialidad").update({
                    descripcion: body[i].descripcion
                }).where({
                    id: body[i].id
                });
                continue;
            }
            else{
                console.log("insert", body[i].descripcion);
                await db("ccvma.especialidad").insert({
                    descripcion: body[i].descripcion
                });
                continue;
            }
        }
        catch(error){
            return {error: error.toString()};
        }
    }
    return true;
};

const addOrUpdateMaintenanceModel = async (body) => {
    console.log(body);
    for (let i = 0; i < body.length; i++){
        try{
            const update = await db("ccvma.mantenimiento_ac").select("*").where({
                id: body[i].id
            });
            if (update.length){
                await db("ccvma.mantenimiento_ac").update({
                    cap_enf: body[i].cap_enf,
                    tecnico: body[i].tecnico,
                    ult_fecha_mantenimiento: body[i].ult_fecha_mantenimiento,
                    precio_mant: body[i].precio_mant,
                    observacion: body[i].observacion,
                }).where({
                    id: body[i].id
                });
                continue;
            }
            else{
                console.log("insert", body[i].descripcion);
                await db("ccvma.mantenimiento_ac").insert({
                    cap_enf: body[i].cap_enf,
                    tecnico: body[i].tecnico,
                    ult_fecha_mantenimiento: body[i].ult_fecha_mantenimiento,
                    precio_mant: body[i].precio_mant,
                    observacion: body[i].observacion,
                    id_consultorio: body[i].id_consultorio
                });
                continue;
            }
        }
        catch(error){
            return {error: error.toString()};
        }
    }
    return true;
};

const getAllPaymentsModel = async () => {
    const result = await db("ccvma.historial_pagos as hp")
    .select("hp.id", "hp.fecha_corte", "hp.fecha_pago", "hp.monto", "hp.restante")
    .select("cm.id as id_consultorios_medicos", "cm.id_medico", "cm.condicion", "cm.hora_inicio", "cm.hora_fin", "cm.solvente")
    .select("c.id as id_consultorio", "c.num_consultorio", "c.observaciones")
    .select("m.nombre_completo as nombre_medico")
    .join("ccvma.consultorios_medicos as cm", "hp.id_consultorios_medicos", "cm.id")
    .join("ccvma.medicos as m", "cm.id_medico", "m.id")
    .join("ccvma.consultorios as c", "cm.id_consultorio", "c.id");

    return result;
};

const getAllSpecialtiesModel = async () => {
    const result = await db("ccvma.especialidad").select("*");

    return result;
};

const getAllDoctorsOfficeModel = async (filters = {}) => {
    const result = await db("ccvma.consultorios as c")
    .select("c.id", "c.observaciones", "c.num_consultorio")
    .select("mac.id as id_mantenimiento_ac", "mac.cap_enf", "mac.tecnico", "mac.ult_fecha_mantenimiento", "mac.precio_mant")
    .leftJoin("mantenimiento_ac as mac", "mac.id_consultorio", "c.id")

    // const result = await db.raw(`
    //     (
    //     SELECT c.id, c.observaciones, c.num_consultorio
    //     FROM consultorios as c
    //     LEFT JOIN (
    //         SELECT mac.id as id_mantenimiento_ac, mac.cap_enf, mac.tecnico, mac.ult_fecha_mantenimiento, mac.precio_mant
    //         FROM mantenimiento_ac as mac
    //         INNER JOIN (
    //             SELECT id_consultorio MAX(ult_fecha_mantenimiento) as ultimate_fecha
    //             FROM mantenimiento_ac
    //             GROUP BY mac.id_consultorio
    //         ) as max_mac ON mac.id_consultorio = max_mac.id_consultorio AND mac.ult_fecha_mantenimiento = max_mac.ult_fecha_mantenimiento
    //     ) as m ON c.id = m.id_consultorio
    //     )
    //     `);

    return result;
};

const getAllDoctorsModel = async () => {
    const result = await db("ccvma.medicos as m")
    .select("m.id", "m.nombre_completo", "m.cedula", "m.num_telefono", "m.correo")
    .select("e.id as id_especialidad", "e.descripcion")
    .join("ccvma.especialidad_medicos as em", "m.id", "em.id_medico")
    .join("ccvma.especialidad as e", "e.id", "em.id_especialidad");
    return result;
};

const getAllSchedulesModel = async () => {
    const result = await db("ccvma.consultorios_medicos as cm")
    .select("cm.id as id", "cm.id_consultorio", "cm.condicion", "cm.hora_inicio", "cm.hora_fin", "cm.solvente")
    .select("m.id as id_medico", "m.nombre_completo", "m.cedula", "m.num_telefono", "m.correo")
    .select("c.id as id_consultorio", "c.num_consultorio", "c.observaciones")
    .select(db.raw("GROUP_CONCAT(DISTINCT hp.monto ORDER BY hp.id) as pagos"))
    .select(db.raw("GROUP_CONCAT(DISTINCT hp.restante ORDER BY hp.id) as monto_restantes"))
    .join("ccvma.consultorios as c", "cm.id_consultorio", "c.id")
    .leftJoin("ccvma.historial_pagos as hp", "hp.id_consultorios_medicos", "cm.id")
    .join("ccvma.medicos as m", "cm.id_medico", "m.id")
    .groupBy("cm.id");
    
    return result;
};

const getAllMaintenanceModel = async () => {
    const result = await db("ccvma.mantenimiento_ac").select("*");

    return result;
};

const addNewScheduleModel = async (body) => {
    const result = await db("ccvma.consultorios_medicos")
    .insert({
        id_medico: body.id_medico,
        id_consultorio: body.id_consultorio,
        condicion: body.condicion,
        hora_inicio: body.hora_inicio,
        hora_fin: body.hora_fin,
        solvente: 0
    });

    return result;
};

const updateDoctorModel = async (body) => {
    const result = await db("ccvma.medicos")
    .update({
        nombre_completo: body.nombre_completo,
        cedula: body.cedula,
        num_telefono: body.num_telefono,
        correo: body.correo
    })
    .where({
        id: body.id
    });

    await db("ccvma.especialidad_medicos").update({
        id_especialidad: body.especialidad
    }).where({
        id_medico: body.id
    });

    return result;
};

const updateDoctorsOfficeModel = async (body) => {
    const result = await db("ccvma.consultorios")
    .update({
        num_consultorio: body.num_consultorio,
        observaciones: body.observaciones
    }).where({
        id: body.id
    });

    return result;
};

const updateScheduleModel = async (body) => {
    const result = await db("ccvma.consultorios_medicos")
    .update({
        id_medico: body.id_medico,
        id_consultorio: body.id_consultorio,
        condicion: body.condicion,
        hora_inicio: body.hora_inicio,
        hora_fin: body.hora_fin
    }).where({
        id: body.id
    });

    return result;
};

const deleteScheduleModel = async (id) => {
    await db("ccvma.historial_pagos").where({
        id_consultorios_medicos: id
    }).delete();

    const result = await db("ccvma.consultorios_medicos")
    .where({id: id})
    .delete();

    return result;
};

const deletePaymentModel = async (id, id_consultorios_medicos) => {
    const result = await db("ccvma.historial_pagos").where({
        id: id
    }).delete();

    await db("ccvma.consultorios_medicos").update({
        solvente: 0
    }).where({
        id: id_consultorios_medicos
    })

    return result;
};

const deleteDoctorModel = async (id) => {
    try{
        await db("ccvma.especialidad_medicos").where({
            id_medico: id
        }).delete();
    
        const result = await db("ccvma.medicos")
        .where({
            id: id
        }).delete();
    
        return true;
    }
    catch (e){
        console.log(e);
        return false;
    }
};

const deleteSpecialtyModel = async (id) => {
    try{
        await db("ccvma.especialidad_medicos").where({
            id_especialidad: id
        }).update({
            id_especialidad: 4
        });
    
        const result = await db("ccvma.especialidad")
        .where({
            id: id
        }).delete();
    
        return true;
    }
    catch (e){
        console.log(e);
        return false;
    }
};

const deleteMaintenanceModel = async (id) => {
    try{
        await db("ccvma.mantenimiento_ac").where({
            id: id
        }).delete();
        return true;
    }
    catch (e){
        console.log(e);
        return false;
    }
};

const deleteOfficeModel = async (id) => {
    try{
        await db("ccvma.mantenimiento_ac").where({
            id_consultorio: id
        }).delete();

        await db("ccvma.consultorios").where({
            id: id
        }).delete();
        return true;
    }
    catch (e){
        console.log(e);
        return false;
    }
};

module.exports = {
    addNewPaymentModel,
    addNewDoctorsOfficeModel,
    getAllDoctorsOfficeModel,
    addNewScheduleModel,
    addNewDoctorModel,
    getAllDoctorsModel,
    getAllSchedulesModel,
    getAllPaymentsModel,
    updatePaymentModel,
    deletePaymentModel,
    updateScheduleModel,
    deleteScheduleModel,
    addOrUpdateSpecialtiesModel,
    getAllSpecialtiesModel,
    updateDoctorModel,
    deleteDoctorModel,
    getAllMaintenanceModel,
    addOrUpdateMaintenanceModel,
    deleteSpecialtyModel,
    deleteMaintenanceModel,
    deleteOfficeModel,
    updateDoctorsOfficeModel
};