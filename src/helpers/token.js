const jwt = require('jsonwebtoken');

const generateToken = (dataToSign, seed = 'no-seed-for-now', expiresIn = '48h') => {
    let token = jwt.sign({
        dataToSign
    }, seed, {
        expiresIn: expiresIn
    });

    return token;
};

module.exports = {
    generateToken
}