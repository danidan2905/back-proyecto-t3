const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendCodeToMail = async (code, email) => {
    const body = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Código de recuperación de contraseña",
        html: `
        <h2>Recuperación de contraseña</h2>
        <p style='font-size: 15px'>Su código para recuperar contraseña es el siguiente:</p>
        <b style='font-size: 18px'>${code}</b>
        `
    };
    return await transport.sendMail(body);
};

module.exports = sendCodeToMail;