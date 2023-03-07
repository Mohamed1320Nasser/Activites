const userModel = require("../user/user.model");
const { Types } = require("mongoose");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const { transporter } = require("./transporter.email");

const getStudents = async (activityName) => {
  const students = await userModel
    .find({
      activity: Types.ObjectId(activityName),
    })
    .select("email -_id");
  if (students.length == 0) {
    console.log("students not found");
  } else {
    // console.log(students);
    return students;
  }
};

const bodyNotification = async (email, message) => {
  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: '"Thebes Academy " <youthwelfare.thebes@gmail.com>', // sender address
      to: email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: `
    <h2>عزيزي الطالب  </h2>
             <h4>${message}</h4>
              <h3> شكرا لكم</h3>
    `,
    },
    (err, info) => {
      if (err) console.log(err);
      else console.log(info);
    }
  );
};
exports.sendNotification = catchAsyncError(async (req, res, next) => {
  activityName = req.body.activity;
  const students = await getStudents(activityName);
  students.forEach((ele)=>{
   bodyNotification(ele,req.body.message);
  })
res.status(200).json(await getStudents(activityName))
});
