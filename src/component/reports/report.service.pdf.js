let pdf = require("pdf-creator-node");
let fs = require("fs");
let path = require("path");
const { options } = require("./option");
exports.createPDF = async (students) => {
  process.env.OPENSSL_CONF = 'NUL'
  let html = fs.readFileSync(path.join(__dirname, "./pdf.html"), "utf8");
  let fileName = "student.pdf"
  let route = path.join(__dirname, "../../docs", fileName)
  let document = {
    html: html,
    data: { students },
    path: route
  };
  let filePath = `${process.env.DOMAIN}/${fileName}`
  await pdf.create(document, options,)
  return { filePath, route }
}
  /*
html-pdf: Unknown Error\nAuto configuration failed
\n139764995444352:error:25066067:DSO support routines:DLFCN_LOAD:could not load the shared library
:dso_dlfcn.c:185:filename(libssl_conf.so):
 libssl_conf.so: cannot open shared object file: No such file or 
 directory\n139764995444352:error:25070067
 :DSO support routines:DSO_load:could not load the shared library
 :dso_lib.c:244:\n139764995444352:error:0E07506E:configuration file routines:MODULE_LOAD_DSO:
 error loading dso:conf_mod.c:285:module=ssl_conf,
  path=ssl_conf\n139764995444352:error:0E076071:configuration file routines
  :MODULE_RUN:unknown module name:conf_mod.c:222:module=ssl_conf\n"
*/