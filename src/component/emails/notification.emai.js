const userModel = require("../student/student.model");
const { Types } = require("mongoose");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const { transporter } = require("./transporter.email");
const AppError = require("../../utils/AppError");

const getStudents = async (activityId) => {
	const students = await userModel
	  .find({
		activity: activityId
	  })
	  .select("email fullName -_id");
	if (students.length === 0) {
	  return null;
	}
  
	return students;
  };
const bodyNotification = async (fullName,email, message) => {
  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: ` Youth Welfare <${process.env.EMAIL}>`, // sender address
      to: email,
      subject: "Thebes Acadmy",
      text: "Hello Dear",
      html: html(message,fullName)
    }
  );
};
exports.sendNotification = catchAsyncError(async (req, res, next) => {
	const activityId = req.body.activity;
	const students = await getStudents(activityId);
	if (students === null) {
	  return res.status(400).json({ message: "Not Found Student " });
	}
	for (const student of students) {
	  const  email  = student.email;
	  const  fullName  = student.fullName;
	  await bodyNotification(fullName,email, req.body.message);
	}
    return res.status(200).json({students,message:"send notification success"})
});
const html = (message,fullName)=>{

return `

<body
style="
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  margin: 0;
  padding: 0;
"
>
<div
  class="container"
  style="
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
	background-color: #ffffff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  "
>
  <div class="header" style="text-align: center; margin-bottom: 30px">
	<h1 style="color: #333333; margin: 0">Youth Welfare Notification</h1>
  </div>
  <div
	class="message"
	style="
	  margin-bottom: 30px;
	  padding: 20px;
	  background-color: #f9f9f9;
	  border: 1px solid #dddddd;
	"
  >
	<p>Hello  ${fullName}</p>
	<p>
	${message}
	</p>
	
  </div>
  <div class="footer" style="text-align: center">
	<p style=" margin: 0">Best regards,</p>
	<p style=" margin: 0">Your Institution</p>
  </div>
</div>
</body>
`

}