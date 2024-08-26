const {StatusCodes} = require("http-status-codes");
const { generateToken } = require('../helpers/token');
const {
    findUserData,
    findTokenByIdUserModel,
    saveTokenModel
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

module.exports = {
    login,
}