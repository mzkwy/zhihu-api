const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

exports = module.exports = Topic

/**
 * Initialize `Topic` with given `id`.
 *
 * If `id` is an object, then it must have an `id` property.
 *
 * @param {Number|Object} id
 * @public
 */
function Topic(id) {
  if (!(this instanceof Topic)) {
    return new Topic(id)
  }

  if (typeof id === 'object') {
    this._topic = id
  } else {
    this._topic = {
      id
    }
  }
}

/**
 * The root topic, of which `id` is `19776749`.
 */
Topic.root = Topic(19776749)

var proto = Topic.prototype

/**
 * Get the hierarchy information of the topic.
 *
 * The url is: https://www.zhihu.com/topic/${id}/organize
 * For example: https://www.zhihu.com/topic/19554791/organize
 * The root topic is: https://www.zhihu.com/topic/19776749/organize
 * For entire hierarchy of the topic, see:
 * https://www.zhihu.com/topic/${id}/organize/entire
 *
 * @public
 */
proto.hierarchy = function() {
  var id = this._topic.id
  var url = urls.topic.organize(id)

  return request(url)
    .then(parser.parseTopicHierarchy)
}

/**
 * Get followers of the topic.
 *
 * The url is: https://www.zhihu.com/topic/${id}/followers
 * For example: https://www.zhihu.com/topic/19554791/followers
 *
 * @param {Number} [start=Date.now()/1000] timestamp in seconds
 * @param {Number} [offset=0]
 * @public
 */
proto.followers = function(start, offset) {
  var id = this._topic.id
  var url = urls.topic.followers(id)

  return request.xsrf()
    .then(_xsrf => ({
      offset: offset || 0,
      start: start || '',
      _xsrf
    }))
    .then(data => request(url, data))
    .then(data => {
      data = JSON.parse(data)
      return parser.parseTopicFollowers(data.msg[1])
    })
}

/**
 * Get top answers of the topic.
 *
 * The url is: https://www.zhihu.com/topic/${id}/top-answers
 * For example: https://www.zhihu.com/topic/19554791/top-answers
 *
 * @param {Number} [page=1]
 * @public
 */
proto.topAnswers = function(page) {
  var id = this._topic.id
  var url = urls.topic.topAnswers(id, page)

  return request(url)
    .then(parser.parseTopicAnswers)
}

/**
 * Get hot answers of the topic.
 *
 * The url is: https://www.zhihu.com/topic/${id}/hot
 * For example: https://www.zhihu.com/topic/19554791/hot
 *
 * @param {Number|''} [offset=''] answer score
 * @public
 */
proto.hotAnswers = function(offset) {
  var id = this._topic.id
  var url = urls.topic.hotAnswers(id)

  return request.xsrf()
    .then(_xsrf => ({
      start: 0,
      offset: offset || '',
      _xsrf
    }))
    .then(data => request(url, data))
    .then(data => {
      data = JSON.parse(data)
      return parser.parseTopicAnswers(data.msg[1])
    })
}

/**
 * Get new answers of the topic.
 *
 * The url is: https://www.zhihu.com/topic/${id}/newest
 * For example: https://www.zhihu.com/topic/19554791/newest
 *
 * @param {Number|''} [offset=''] answer score
 * @public
 */
proto.newAnswers = function(offset) {
  var id = this._topic.id
  var url = urls.topic.newAnswers(id)

  return request.xsrf()
    .then(_xsrf => ({
      start: 0,
      offset: offset || '',
      _xsrf
    }))
    .then(data => request(url, data))
    .then(data => {
      data = JSON.parse(data)
      return parser.parseTopicAnswers(data.msg[1])
    })
}

/**
 * Get pending questions of the topic.
 *
 * The url is: https://www.zhihu.com/topic/${id}/questions
 * For example: https://www.zhihu.com/topic/19554791/questions
 * For more information about what is a pending question, see:
 * https://www.zhihu.com/question/40470324
 *
 * @param {Number} [page=1]
 * @public
 */
proto.pendingQuestions = function(page) {
  var id = this._topic.id
  var url = urls.topic.pendingQuestions(id, page)

  return request(url)
    .then(parser.parseTopicQuestions)
}

/**
 * Get hot pending questions of the topic.
 *
 * The url is: https://www.zhihu.com/topic/${id}/unanswered
 * For example: https://www.zhihu.com/topic/19554791/unanswered
 * For more information about what is a pending question, see:
 * https://www.zhihu.com/question/40470324
 *
 * @param {Number} [page=1]
 * @public
 */
proto.hotPendingQuestions = function(page) {
  var id = this._topic.id
  var url = urls.topic.hotPendingQuestions(id, page)

  return request(url)
    .then(parser.parseTopicQuestions)
}
