const db = require("../../knexfile");

const getAllSecurityQModel = async () => {
    const result = await db("ccvma.preguntas_seguridad").select("*");

    return result;
};

const getAllUsersModel = async () => {
    const result = await db("ccvma.usuarios").select("*");

    return result;
};

const getAllLogbookModel = async () => {
    const result = await db("ccvma.bitacora as b")
    .select("b.id", "b.accion", "b.fecha")
    .select("u.id as id_usuario", "u.nombre", "u.usuario", "u.cargo", "u.estado")
    .join("ccvma.usuarios as u", "u.id", "b.id_usuario");

    return result;
};

const getUserByIdModel = async (id) => {
    const result = await db("ccvma.usuarios").select("*").where({id: id}).first();

    return result;
};

const addUserModel = async (body) => {
    const result = await db("ccvma.usuarios").insert({
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
    const result = await db("ccvma.usuarios")
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
const deleteUserModel = async (id, auth) => {
    const findUser = await db("ccvma.usuarios").select("id").where(({
        usuario: auth.username,
        'contraseña': auth.pass,
    }));
    
    if (findUser.length){
        await db("ccvma.tokens").where({
            id_user: id
        }).delete();
        
        const result = await db("ccvma.usuarios")
        .where({
            id: id
        }).delete();

        return {
            ok: true
        }
    }
    else{
        return {
            error: 'Contraseña incorrecta',
            ok: false
        }
    }
};

module.exports = {
    getAllSecurityQModel,
    addUserModel,
    getAllUsersModel,
    editUserModel,
    deleteUserModel,
    getUserByIdModel,
    getAllLogbookModel
};