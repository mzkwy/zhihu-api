const config = require('./lib/config')
const answer = require('./lib/api/answer')
const question = require('./lib/api/question')
const user = require('./lib/api/user')

module.exports = function(cookie) {
	config.setCookie(cookie)

	return {
		_config: config,
		answer,
		question,
		user
	}
}