const fs = require('fs')
const api = require('./index')

api.cookie(fs.readFileSync('./cookie'))
api.user('zhihuadmin')
    .detail()
    .then(console.log)
    .catch(console.trace)
