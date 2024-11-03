const { StatusCodes } = require("http-status-codes");
const { getAllSecurityQModel, addUserModel, getAllUsersModel, editUserModel, deleteUserModel } = require("../model/superadmin.model");
const { findUserByToken } = require("../model/users.model");

const getAllSecurityQ = async (req, res) => {
    try{
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin'){
            const response = await getAllSecurityQModel();
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

const getAllUsers = async (req, res) => {
    try{
        const header = req.headers;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin'){
            const response = await getAllUsersModel();
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

const addUser = async (req, res) => {
    try{
        const header = req.headers;
        const body = req.body;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin'){
            const response = await addUserModel(body);
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

const editUser = async (req, res) => {
    try{
        const header = req.headers;
        const body = req.body;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin'){
            const response = await editUserModel(body);
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

const deleteUser = async (req, res) => {
    try{
        const header = req.headers;
        const {id} = req.params;

        const token = header.authorization.split("Bearer ")[1] || '---';

        const result = await findUserByToken(token);

        if (result.cargo == 'superadmin'){
            const response = await deleteUserModel(id);
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
    getAllSecurityQ,
    addUser,
    getAllUsers,
    editUser,
    deleteUser
};