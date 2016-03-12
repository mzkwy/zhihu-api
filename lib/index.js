const config = require('./config')
const answer = require('./api/answer')
const question = require('./api/question')
const user = require('./api/user')

module.exports = function(cookiePath) {
    config.setCookie(cookiePath)

    return {
        _config: config,
        answer,
        question,
        user
    }
}
