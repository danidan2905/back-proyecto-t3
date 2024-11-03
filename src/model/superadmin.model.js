const db = require("../../knexfile");

const getAllSecurityQModel = async () => {
    const result = await db("preguntas_seguridad").select("*");

    return result;
};

const getAllUsersModel = async () => {
    const result = await db("usuarios").select("*");

    return result;
};

const addUserModel = async (body) => {
    const result = await db("usuarios").insert({
        nombre: body.nombre,
        usuario: body.usuario,
        contraseña: body.pass,
        cargo: body.cargo,
        id_pregunta_seguridad: body.id_pregunta_seguridad,
        respuesta_seguridad: body.respuesta,
        correo: body.correo
    });

    return result;
};

const editUserModel = async (body) => {
    const result = await db("usuarios")
    .where({
        id: body.id
    })
    .update({
        nombre: body.nombre,
        usuario: body.usuario,
        contraseña: body.pass,
        cargo: body.cargo,
        id_pregunta_seguridad: body.id_pregunta_seguridad,
        respuesta_seguridad: body.respuesta,
        correo: body.correo
    });

    return result;
};
const deleteUserModel = async (id) => {
    const result = await db("usuarios")
    .where({
        id: id
    }).delete();
};

module.exports = {
    getAllSecurityQModel,
    addUserModel,
    getAllUsersModel,
    editUserModel,
    deleteUserModel
};