const Request = require('./lib/request')
const user = require('./lib/api/user')
const Org = require('./lib/api/org')
const Topic = require('./lib/api/topic')
const Question = require('./lib/api/question')
const Answer = require('./lib/api/answer')

var _request = new Request()

function cookie(val) {
  if (!arguments.length) {
    return _request.headers['Cookie']
  } else {
    _request.setCookie(val)
  }
}

function proxy(val) {
  if (!arguments.length) {
    return _request.proxy
  } else {
    _request.setProxy(val)
  }
}

Object.setPrototypeOf(Org.prototype, _request)
Object.setPrototypeOf(Topic.prototype, _request)
Object.setPrototypeOf(Question.prototype, _request)
Object.setPrototypeOf(Answer.prototype, _request)

module.exports = {
  _request,
  cookie,
  proxy,
  user: user(_request),
  org: Org,
  topic: Topic,
  question: Question,
  answer: Answer,
  version: require('./package').version
}