const fs = require('fs')
const path = require('path')
const api = require('../../index')

var cookiePath = path.join(__dirname, '../../cookie')
api.cookie(fs.readFileSync(cookiePath))

module.exports = api
