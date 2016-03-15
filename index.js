const config = require('./lib/config')
const question = require('./lib/api/question')
const user = require('./lib/api/user')

module.exports = function(cookie) {
	config.setCookie(cookie)

	return {
		_config: config,
		question,
		user
	}
}
