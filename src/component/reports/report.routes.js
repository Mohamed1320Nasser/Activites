const { createPDF } = require('./report.service.pdf')

const router=require('express').Router()

router.get('/',createPDF)


module.exports=router