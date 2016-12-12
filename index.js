const Request = require('./lib/request')
const user = require('./lib/api/user')
const topic = require('./lib/api/topic')
const question = require('./lib/api/question')
const answer = require('./lib/api/answer')
const image = require('./lib/api/image')

module.exports = function() {
  var _request = new Request()

  var api = {
    cookie(val) {
      if (!arguments.length) {
        return _request.headers['Cookie']
      } else {
        _request.setCookie(val)
      }
    },

    proxy(val) {
      if (!arguments.length) {
        return _request.proxy
      } else {
        _request.setProxy(val)
      }
    },

    user: user(_request),
    topic: topic(_request),
    question: question(_request),
    answer: answer(_request),
    image: image(_request),

    version: require('./package').version
  }

  return api
}
