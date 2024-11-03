const {StatusCodes} = require("http-status-codes");
const { findUserByToken } = require("../model/users.model");
const { getHomeValuesModel, getSummaryOfficesModel } = require("../model/dashboard.model");


const getHomeValues = async (req, res) => {
    try{
        const header = req.headers;
    
        const token = header.authorization.split("Bearer ")[1];
    
        const result = await findUserByToken(token);
    
        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const totalAmount = await getHomeValuesModel();
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: totalAmount
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ok: false});
    }
};

const getSummaryOffices = async (req, res) => {
    try{
        const header = req.headers;
    
        const token = header.authorization.split("Bearer ")[1];
    
        const result = await findUserByToken(token);
    
        if (result.cargo == 'superadmin' || result.cargo == 'admin'){
            const totalAmount = await getSummaryOfficesModel();
            res.status(StatusCodes.ACCEPTED).send({
                ok: true,
                object: totalAmount
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ok: false});
    }
};

module.exports = {
    getHomeValues,
    getSummaryOffices
}