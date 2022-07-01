const express = require('express')
const router = express.Router()
const codes = require('./codes/codes.controller')
router.use('/codes', codes)
// Add more routes here if you want!
module.exports = router