const db = require('../../knexfile');

const findUserData = async (user, password) => {
    const result = await db.select('*').from('users')
    .join('security_questions', 'users.id_security_question', 'security_questions.id')
    .join('security_answers', 'users.id_security_answer', 'security_answers.id')
    .join('user_roles', 'users.id_user_rol', 'user_roles.id')
    .where({
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

const removeTokenByIdUserModel = async (id_user) => {
    const result = await db("tokens").where({id_user}).del();
    if (result) return true;
    return false;
};

module.exports = {
    findUserData,
    saveTokenModel,
    findTokenByIdUserModel,
    updateTokenModel,
    removeTokenByIdUserModel
}