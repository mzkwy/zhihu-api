const config = require('./lib/config')
const request = require('./lib/request')
const action = require('./lib/api/action')
const answer = require('./lib/api/answer')
const question = require('./lib/api/question')
const topic = require('./lib/api/topic')
const user = require('./lib/api/user')

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
  action,
  answer,
  question,
  topic,
  user
}
