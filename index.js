// const action = require('./lib/api/action')
// const answer = require('./lib/api/answer')
// const org = require('./lib/api/org')
// const question = require('./lib/api/question')
const Request = require('./lib/request')
const User = require('./lib/api/user')
const Topic = require('./lib/api/topic')
const package = require('./package')


module.exports = API

function API(cookie) {
  if (!(this instanceof API)) {
    return new API(cookie)
  }

  var request = new Request()
  request.setCookie(cookie)

  this._request = request
  this.user = User
  this.topic = Topic
  this.version = package.version

  User.prototype.__proto__ = request
  Topic.prototype.__proto__ = request
}
