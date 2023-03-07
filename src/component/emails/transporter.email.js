
const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
       auth: {
         user: "youthwelfare.thebes@gmail.com", // generated ethereal user
         pass: "fxfrirmjzvqmthfu", // generated ethereal password
       },
     });