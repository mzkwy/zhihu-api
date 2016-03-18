const config = require('./lib/config')
const question = require('./lib/api/question')
const user = require('./lib/api/user')

function cookie(_cookie) {
    if (_cookie) {
        config.setCookie(_cookie)
    } else {
        return config.headers['Cookie']
    }
}

module.exports = {
    _config: config,
    cookie,
    question,
    user
}
