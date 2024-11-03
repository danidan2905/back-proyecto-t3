const db = require('../../knexfile');

const getTotalAmountModel = async () => {
    const result = await db("historial_pagos as hp").select("SUM(hp.monto) as total");
    return result;
};


module.exports = {
    getTotalAmountModel
};