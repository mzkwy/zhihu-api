const Request = require('./lib/request')
const User = require('./lib/api/user')
const Org = require('./lib/api/org')
const Topic = require('./lib/api/topic')
const Question = require('./lib/api/question')
const Answer = require('./lib/api/answer')
const package = require('./package')

var _request = new Request()

function cookie(val) {
  if (!arguments.length) {
    return _request.headers['Cookie']
  } else {
    _request.setCookie(val)
  }
}

User.prototype.__proto__ = _request
Org.prototype.__proto__ = _request
Topic.prototype.__proto__ = _request
Question.prototype.__proto__ = _request
Answer.prototype.__proto__ = _request

module.exports = {
  _request,
  cookie,
  user: User,
  org: Org,
  topic: Topic,
  question: Question,
  answer: Answer,
  version: package.version
}
