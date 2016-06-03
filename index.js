const config = require('./lib/config')
const request = require('./lib/request')
const action = require('./lib/api/action')
const answer = require('./lib/api/answer')
const question = require('./lib/api/question')
const topic = require('./lib/api/topic')
const user = require('./lib/api/user')
const package = require('./package.json')

/**
 * Get or set cookie. Fast access for `api._config.cookie`
 *
 * @param  {String|Buffer} [_cookie]
 * @public
 */
function cookie(_cookie) {
  if (_cookie) {
    config.cookie = _cookie
  } else {
    return config.cookie
  }
}

module.exports = {
  _config: config,
  _request: request,
  cookie,
  version: package.version,
  action,
  answer,
  question,
  topic,
  user
}
