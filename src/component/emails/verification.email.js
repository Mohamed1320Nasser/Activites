const fs = require("fs");
const path =require( 'path');
const { transporter } = require("./transporter.email");
const html = fs.readFileSync(path.resolve(__dirname,"../../../public/confgration.html"), "utf8");
exports.sendEmail = async (user, host) => {
  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: '"Thebes Academy " <youthwelfare.thebes@gmail.com>', // sender address
      to: user.email,
      subject: "Hello ✔",
      text: "Hello world?",
      html:html,
    },
    (err, info) => {
      if (err) console.log(err);
      else console.log(info);
    }
  );
};
