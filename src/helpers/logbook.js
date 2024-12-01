const db = require("../../knexfile");

const addActionToLogbook = async (id_user, action) => {
    try{
        await db("ccvma.bitacora").insert({
            id_usuario: id_user,
            accion: action
        });

        return true;
    }
    catch (e){
        console.log(e);

        return false;
    }
}

module.exports = {
    addActionToLogbook
};