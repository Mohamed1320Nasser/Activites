
const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
       auth: {
         user: process.env.EMAIL, // generated ethereal user
         pass: process.env.PASSWORD, // generated ethereal password
       },
     });