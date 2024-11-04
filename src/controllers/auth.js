const {StatusCodes} = require("http-status-codes");
const { generateToken } = require('../helpers/token');
const cryptojs = require("crypto-js");
const {
    findUserData,
    findTokenByIdUserModel,
    saveTokenModel,
    removeTokenByIdUserModel,
    blockUserModel,
    unlockUserModel
} = require('../model/users.model');

const login = async (req, res) => {
    let {username, password} = req.body;

    const passSHA = String(cryptojs.SHA256(password));

    const userData = await findUserData(username, passSHA);
    if (userData){
        if (userData.estado){
            const findToken = await findTokenByIdUserModel(userData.id);
            let token = '';

            if (!(findToken?.token)){
                token = generateToken(userData.username);
                await saveTokenModel(token, userData.id);
            }
            else{
                token = findToken.token;
            }

            res.status(StatusCodes.OK).send({
                ok: true,
                object: {...userData, token: token},
            });
            return;
        }
        else{
            res.status(StatusCodes.FORBIDDEN).send({
                ok: false,
                error: 'Sesión bloqueada',
                estado: userData.estado
            });
            return;
        }

    }
    else{
        res.status(StatusCodes.BAD_REQUEST).send({
            ok: false,
            error: 'Usuario o contraseña incorrectos'
        });
        return;
    }
};

const blockUser = async (req, res) => {
    try{
        let {usuario} = req.params;
    
        const result = await blockUserModel(usuario);
    
        res.status(StatusCodes.ACCEPTED).send({
            ok: true,
            object: result
        });
        return;
    }
    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: true,
            error: e
        });
        return;
    }
};

const unlockUser = async (req, res) => {
    try{
        let {id_user} = req.params;
        let auth = req.body;
    
        const result = await unlockUserModel(auth, id_user);
    
        res.status(StatusCodes.ACCEPTED).send({
            ok: true,
            object: result
        });
        return;
    }
    catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            ok: true,
            error: e.toString()
        });
        return;
    }
};

const logout = async (req, res) => {
    let { id_user } = req.body;
    
    const result = await removeTokenByIdUserModel(id_user);

    res.status(StatusCodes.ACCEPTED).send({
        ok: result
    });
    return;
};

const getToken = async (req, res) => {
    let { id_user } = req.params;
    
    const result = await findTokenByIdUserModel(id_user);

    res.status(StatusCodes.ACCEPTED).send({
        ok: true,
        object: result
    });
    return;
};

module.exports = {
    login,
    logout,
    getToken,
    blockUser,
    unlockUser
}