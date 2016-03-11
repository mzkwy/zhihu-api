const config = require('./config')
const question = require('./api/question')
const user = require('./api/user')

module.exports = function(cookiePath) {
    config.setCookie(cookiePath)

    return {
        _config: config,
        question,
        user
    }
}
