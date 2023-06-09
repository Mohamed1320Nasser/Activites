let pdf = require("pdf-creator-node");
let fs = require("fs");
let path = require("path");
const { options } = require("./option");
exports.createPDF= async (students)=>{
    let html = fs.readFileSync(path.join(__dirname,"./pdf.html"), "utf8");
    let fileName="student.pdf"
    let route=  path.join(__dirname,"../../docs",fileName)
    let document = {
        html: html,
        data: {students},
        path: route
      };
      let filePath=`${process.env.DOMAIN}/${fileName}`
   await pdf.create(document, options)
     return { filePath , route}
    }