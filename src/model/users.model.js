let moment = require("moment");
const db = require('../../knexfile');

const findUserData = async (user, password) => {
    const re = await db("ccvma.usuarios").select("*");
    console.log(re);
    const result = await db('ccvma.usuarios as u')
    .select("u.id", "u.nombre", "u.usuario", "u.cargo", "u.correo", "u.estado")
    .select("ps.id as id_pregunta_seguridad", "ps.valor")
    .join('ccvma.preguntas_seguridad as ps', 'u.id_pregunta_seguridad', 'ps.id')
    .where({
        usuario: user,
        'contraseña': password,
    }).first();

    return result;
};

const saveTokenModel = async (token, id_user) => {
    const result = await db("ccvma.tokens").insert({
        token,
        id_user,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        expires_at: moment().add(4, "hours").format("YYYY-MM-DD HH:mm:ss"),
        state: 1
    });

    return result;
};

const findTokenByIdUserModel = async (id_user) => {
    const result = await db("ccvma.tokens").select("*").where({
        id_user: id_user
    }).first();

    return result;
};

const updateTokenModel = async (token, id_user) => {
    const result = await db("ccvma.tokens").where({
        token,
        id_user
    }).update({
        token
    });

    return result;
};

const removeTokenByIdUserModel = async (id_user) => {
    const result = await db("ccvma.tokens").where({id_user}).del();
    if (result) return true;
    return false;
};

const findUserByToken = async (token) => {
    const userByToken = await db("ccvma.tokens").where({token: token})
    .join("ccvma.usuarios", "usuarios.id", "tokens.id_user").first();

    return userByToken;
};

const unlockUserModel = async (auth, id_user) => {
    const findUser = await db("ccvma.usuarios").select("id").where(({
        usuario: auth.username,
        'contraseña': auth.password,
    }));
    
    if (findUser.length){
        await db("ccvma.usuarios").update({
            estado: 1
        }).where({
            id: id_user
        });

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

const blockUserModel = async (usuario) => {
    const result = await db("ccvma.usuarios").update({
        estado: 0
    }).where({
        usuario: usuario
    });

    return result;
};

const getSecurityQuestionModel = async (username) => {
    const result = await db("ccvma.usuarios")
    .select("usuarios.id_pregunta_seguridad", "usuarios.id as user_id")
    .select("ps.valor")
    .join("ccvma.preguntas_seguridad as ps", "usuarios.id_pregunta_seguridad", "ps.id")
    .where({
        usuario: username
    });

    return result;
}

const checkAnswerModel = async (answer, id_user) => {
    const result = await db("ccvma.usuarios").select("usuarios.id")
    .where({
        id: id_user,
        respuesta_seguridad: answer
    });

    return result;
};

const checkCodeModel = async (code, id) => {
    const result = await db("ccvma.codigos_seguridad").select("codigos_seguridad.id")
    .where({
        id_usuario: id,
        valor: code
    }).first();

    return result;
};

const updatePasswordModel = async (password, id_user) => {
    try{
        const result = await db("ccvma.usuarios")
        .update({
            'contraseña': password
        })
        .where({
            id: id_user
        });
    
        return true;
    }
    catch(e){
        return e.toString();
    }
};

const getEmailByUsernameModel = async (username) => {
    const result = await db("ccvma.usuarios")
    .select("usuarios.correo", "usuarios.id")
    .where({
        usuario: username
    }).first();

    return result;
}

const saveCodeModel = async (code, id_user) => {
    try{
        const result = await db("ccvma.codigos_seguridad")
        .insert({
            valor: code,
            id_usuario: id_user
        });

        return true;
    }
    catch (e){
        console.log(e);
        return false;
    }
};

const deleteCodeModel = async (code, id) => {
    try{
        await db("ccvma.codigos_seguridad")
        .where({
            valor: code,
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
    findUserData,
    saveTokenModel,
    findTokenByIdUserModel,
    updateTokenModel,
    removeTokenByIdUserModel,
    findUserByToken,
    blockUserModel,
    unlockUserModel,
    getSecurityQuestionModel,
    checkAnswerModel,
    updatePasswordModel,
    getEmailByUsernameModel,
    saveCodeModel,
    checkCodeModel,
    deleteCodeModel
}