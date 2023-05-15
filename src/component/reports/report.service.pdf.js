let pdf = require("pdf-creator-node");
const {v4 : uuidv4} = require('uuid')
let fs = require("fs");
let path = require("path");
const { options } = require("./option");
exports.createPDF= async (students)=>{
    let html = fs.readFileSync(path.join(__dirname,"./pdf.html"), "utf8");
    const userId = uuidv4()
    let fileName=`${userId}.pdf`
    let document = {
        html: html,
        data: {students},
        path: path.join(__dirname,"../../docs",fileName)
      };
      let filePath=`http://localhost:3000/${fileName}`
let result =await pdf.create(document, options)
url= `<a download href = ${filePath}>Download</a>`
return { url, filePath}
    }