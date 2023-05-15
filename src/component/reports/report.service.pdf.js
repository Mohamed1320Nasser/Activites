let pdf = require("pdf-creator-node");
let fs = require("fs");
let path = require("path");
const { catchAsyncError } = require("../../utils/catchAsyncErr");
const { options } = require("./option");
const studentModel = require('../student/student.model')
exports.createPDF= catchAsyncError(async(req,res,next)=>{
  const students = await studentModel.find({}).lean()
    let html = fs.readFileSync(path.join(__dirname,"./pdf.html"), "utf8");
    let fileName="mohamedata.pdf";
    let document = {
        html: html,
        data: {students},
        path: path.join(__dirname,"../../docs",fileName)
      };
      let filePath=`http://localhost:3000/${fileName}`
let result =await pdf.create(document, options)
res.send(`<a download href = ${filePath}>Download</a>`)
})