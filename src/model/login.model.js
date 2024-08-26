const db = require('../../knexfile');

const findUserData = async (user, password) => {
    const result = await db.select('username', 'id').from('users').where({
        username: user,
        password: password
    }).first();

    return result;
};

const saveTokenModel = async (token, id_user) => {
    const result = await db("tokens").insert({
        token,
        id_user
    });

    return result;
};

const findTokenByIdUserModel = async (id_user) => {
    const result = await db("tokens").select("*").where({
        id_user
    }).first();

    return result;
};

const updateTokenModel = async (token, id_user) => {
    const result = await db("tokens").where({
        token,
        id_user
    }).update({
        token
    });

    return result;
};

module.exports = {
    findUserData,
    saveTokenModel,
    findTokenByIdUserModel,
    updateTokenModel
}