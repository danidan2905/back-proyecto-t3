const db = require('../../knexfile');
let moment = require("moment");

const getHomeValuesModel = async () => {
    const totalAmount = await db("historial_pagos as hp").sum("monto as total");

    const amountCurrentMonth = await db("historial_pagos as hp")
    .sum("monto as total")
    .whereBetween('fecha_corte', [
        moment().startOf("month").format("YYYY-MM-DD"),
        moment().endOf("month").format("YYYY-MM-DD")
    ]);

    const amountPastMonth = await db("historial_pagos as hp")
    .sum("monto as total")
    .whereBetween('fecha_corte', [
        moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
        moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD")
    ]);

    const totalOffices = await db("consultorios").count("* as total");
    const totalOfficesInUse = await db("consultorios_medicos").countDistinct("id_consultorio as total");
    const totalFreeOffices = await db("consultorios_medicos").countDistinct("id_consultorio as total").where({
        condicion: 'not_used'
    });

    return {
        totalAmount,
        amountCurrentMonth,
        amountPastMonth,
        totalOffices,
        totalOfficesInUse,
        totalFreeOffices
    };
};

const getSummaryOfficesModel = async () => {
    const paid = await db("consultorios_medicos").countDistinct("id as totalPagados").where({
        solvente: 1
    });

    const halfPaid = await db("consultorios_medicos").countDistinct("id as totalAbonados").where({
        solvente: 2
    });

    const notPaid = await db("consultorios_medicos").countDistinct("id as noPagados").where({
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