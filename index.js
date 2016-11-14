// const action = require('./lib/api/action')
// const answer = require('./lib/api/answer')
// const org = require('./lib/api/org')
const Request = require('./lib/request')
const User = require('./lib/api/user')
const Topic = require('./lib/api/topic')
const Question = require('./lib/api/question')
const package = require('./package')

module.exports = API

function API(cookie) {
  if (!(this instanceof API)) {
    return new API(cookie)
  }

  var request = new Request()
  request.setCookie(cookie)

  User.prototype.__proto__ = request
  Topic.prototype.__proto__ = request
  Question.prototype.__proto__ = request

  this._request = request
  this.user = User
  this.topic = Topic
  this.question = Question
  this.version = package.version
}
