const nodemailer = require("nodemailer");

exports.sendEmail= async(user,host)=>{


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
 service: 'gmail',
    auth: {
      user: "youthwelfare.thebes@gmail.com", // generated ethereal user
      pass: "fxfrirmjzvqmthfu", // generated ethereal password
    },
  });
  // send mail with defined transport object
   await transporter.sendMail({
    from: '"Thebes Academy " <youthwelfare.thebes@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: ` <style type="text/css">
    body {
        margin: 0;
        background-color: #cccccc;
    }

    table {
        border-spacing: 0;
    }

    td {
        padding: 0;
    }

    img {
        border: 0;
    }

    .wrapper {
        width: 100%;
        table-layout: fixed;
        background-color: #cccccc;
        padding-bottom: 60px;
    }

    .main {
        background-color: #ffffff;
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        border-spacing: 0;
        font-family: sans-serif;
        color: #4a4a4a;
    }

    .two-columns {
        text-align: center;
        font-size: 0;
    }

    .two-columns .column {
        width: 100%;
        max-width: 300px;
        display: inline-block;
        vertical-align: top;
    }

    .button {
        background-color: #289dcf;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 20px;
        font-weight: bold;
        border-radius: 5px;
    }
</style>
</head>

<body>
<center class="wrapper">
    <table class="main" width="100%">
        <tr>
            <td height="8" style="background-color:#289dcf ;"></td>
        </tr>
        <tr>
            <td style="padding:14px 0 4px ;">
                <table width="100%">
                    <tr>
                        <td class="two-columns">
                            <table class="column">
                                <tr>
                                    <td style="padding: 0 62px 10px">
                                        <a href="https://thebes.edu.eg/">
                                            <img src="/images/en_logo.png" width="180" title="Logo">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <table class="column">
                                <tr>
                                    <td style="padding: 10px 68px">
                                        <a href="#">
                                            <img src="/images/facebook.png" width="32">
                                        </a>
                                        <a href="#">
                                            <img src="/images/website-logo.png" width="32">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <a href="#">
                    <img src="/images/DSCF8977.jpg" width="600" style="max-width:100%">
                </a>
            </td>
        </tr>
        <tr>
            <td style="padding: 5px 0 50px;">
                <table width="100%">
                    <tr>
                        <td style="text-align: center;padding: 15px; ">
                            <p style="font-size: 20px; font-weight:bold">
                                Verify you email <strong style="color: #289dcf;">address</strong>
                            </p>
                            <p style="font-size: 15px; line-height: 23px;padding: 5px 0 15px; "> please click the
                                button to confirm your email address and activate your account
                            </p>
                            <a href="http://${host}/users/verfy-email?token=${user.emailToken}" class="button">CONFIRM EMAIL</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="background-color:#565656 ; color:#ffffff">
                <table width="100%">
                    <tr>
                        <td style="text-align: center; padding: 45px 20px;">
                            <a href="#">
                                <img src="/images/en_logo.png" width="160" alt="">
                            </a>
                            <p style="padding: 10px; font: 300;">copyright 2023.THEBES.ACADEMY EG</p>
                            <p style="padding: 10px;">You’re receiving this email because you are subscribed to The
                                welfare youth
                            </p>
                            <p>
                            </p>
                            <p style="padding: 10px;"> SUBSCRIBE</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</center>
</body>  `, // html body
    /*
    <h2> ${user.name_en} Thanks for joining Youth Welfare</h2>
             <h4> please verify your mail to continue</h4>
            <a href= "http://${host}/users/verfy-email?token=${user.emailToken}"> verify your mail</a>
    */ 
  },(err, info)=>{
    if(err) console.log(err);
    else  console.log(info)
  }
);






}