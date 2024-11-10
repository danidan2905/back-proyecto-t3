const db = require('../../knexfile');
let moment = require("moment");

const getHomeValuesModel = async () => {
    const totalAmount = await db("ccvma.historial_pagos as hp").sum("monto as total");

    const amountCurrentMonth = await db("ccvma.historial_pagos as hp")
    .sum("monto as total")
    .whereBetween('fecha_pago', [
        moment().startOf("month").format("YYYY-MM-DD"),
        moment().endOf("month").format("YYYY-MM-DD")
    ]);

    const amountToday = await db("ccvma.historial_pagos as hp")
    .sum("monto as total")
    .whereBetween('fecha_pago', [
        `${moment().format("YYYY-MM-DD")}:00:00:00`,
        `${moment().format("YYYY-MM-DD")}:23:59:59`
    ]);

    const totalOffices = await db("ccvma.consultorios").count("* as total");
    const totalOfficesInUse = await db("ccvma.consultorios_medicos").countDistinct("id_consultorio as total");
    const totalFreeOffices = await db("ccvma.consultorios_medicos").countDistinct("id_consultorio as total").where({
        condicion: 'not_used'
    });

    return {
        totalAmount,
        amountCurrentMonth,
        amountToday,
        totalOffices,
        totalOfficesInUse,
        totalFreeOffices
    };
};

const getSummaryOfficesModel = async () => {
    const paid = await db("ccvma.consultorios_medicos").countDistinct("id as totalPagados").where({
        solvente: 1
    });

    const halfPaid = await db("ccvma.consultorios_medicos")
    .join("ccvma.historial_pagos", "consultorios_medicos.id", "historial_pagos.id_consultorios_medicos")
    .whereRaw(`historial_pagos.restante > 0`)
    .countDistinct("consultorios_medicos.id as totalAbonados");

    const notPaid = await db("ccvma.consultorios_medicos").countDistinct("id as noPagados").where({
        solvente: 0
    });

    return {
        paid,
        halfPaid,
        notPaid
    }
};


module.exports = {
    getHomeValuesModel,
    getSummaryOfficesModel
};