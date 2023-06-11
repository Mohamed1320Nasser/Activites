let pdf = require("pdf-creator-node");
let fs = require("fs");
let path = require("path");
const { options } = require("./option");
exports.createPDF = async (students) => {
  process.env.OPENSSL_CONF = 'NUL'
  const studentsWithCounter = students.map((student, index) => ({
    ...student,
    counter: index + 1,
  }));
  let html = fs.readFileSync(path.join(__dirname, "./pdf.html"), "utf8");
  let fileName = "student.pdf"
  let route = path.join(__dirname, "../../docs", fileName)
  let document = {
    html: html,
    data: { students :studentsWithCounter },
    path: route
  };
  let filePath = `${process.env.DOMAIN}/${fileName}`
  await pdf.create(document, options,)
  return { filePath, route }
}
