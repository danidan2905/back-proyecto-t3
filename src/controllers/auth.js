const {StatusCodes} = require("http-status-codes");
const { generateToken } = require('../helpers/token');
const {
    findUserData,
    findTokenByIdUserModel,
    saveTokenModel,
    removeTokenByIdUserModel
} = require('../model/login.model');

const login = async (req, res) => {
    let {username, password} = req.body;

    const userData = await findUserData(username, password);
    if (userData){
        const findToken = await findTokenByIdUserModel(userData.id);
        let token = '';

        if (!(findToken?.token)){
            token = generateToken(userData.username);
            await saveTokenModel(token, userData.id);
        }

        res.status(StatusCodes.OK).send({
            ok: true,
            userData,
            token: findToken?.token ? findToken.token : token
        });

        return;

    }
    else{
        res.status(StatusCodes.BAD_REQUEST).send({
            ok: false,
            error: 'Usuario o contraseña incorrectos'
        });
    }
};

const register_user = async (req, res) => {
    let {
        email,
        username,
        password,
        first_name,
        last_name, 
        phonenumber,
        id_security_question,
        id_security_answer,
        id_user_rol
    } = req.body;
    return true;
};

const logout = async (req, res) => {
    let { id_user } = req.body;
    
    const result = await removeTokenByIdUserModel(id_user);

    res.status(StatusCodes.ACCEPTED).send({
        ok: result
    });
    return;
};

module.exports = {
    login,
    logout
}