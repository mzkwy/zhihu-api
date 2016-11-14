const parser = require('../parser')

module.exports = Topic

/**
 * Initialize a `Topic`.
 *
 * @param {number|object} id
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
 * The root topic, whose `id` is `19776749`.
 */
Topic.root = new Topic(19776749)

/**
 * Get the hierarchy information of the topic.
 *
 * @public
 */
Topic.prototype.hierarchy = function() {
  var url = `/topic/${this._topic.id}/organize`
  return this.get(url)
    .then(parser.parseTopicHierarchy)
}

/**
 * Get followers of the topic.
 *
 * @param {number} start  timestamp in seconds
 * @param {number} offset
 * @public
 */
Topic.prototype.followers = function(start = '', offset = 0) {
  return this.xsrf()
    .then(_xsrf => {
      var url = `/topic/${this._topic.id}/followers`
      var data = {
        start,
        offset,
        _xsrf
      }
      return this.post(url, data).json()
    })
    .then(data => parser.parseTopicFollowers(data.msg[1]))
}

/**
 * Get top answers of the topic.
 *
 * @param {number} page
 * @public
 */
Topic.prototype.topAnswers = function(page = 1) {
  var url = `/topic/${this._topic.id}/top-answers`
  var params = {
    page
  }

  return this.get(url, params)
    .then(parser.parseTopicAnswers)
}

/**
 * Get hot answers of the topic.
 *
 * @param {number} offset answer score
 * @public
 */
Topic.prototype.hotAnswers = function(offset = '') {
  return this.xsrf()
    .then(_xsrf => {
      var url = `/topic/${this._topic.id}/hot`
      var data = {
        start: 0,
        offset,
        _xsrf
      }
      return this.post(url, data).json()
    })
    .then(data => parser.parseTopicAnswers(data.msg[1]))
}

/**
 * Get new answers of the topic.
 *
 * @param {number} offset answer score
 * @public
 */
Topic.prototype.newAnswers = function(offset = '') {
  return this.xsrf()
    .then(_xsrf => {
      var url = `/topic/${this._topic.id}/newest`
      var data = {
        start: 0,
        offset,
        _xsrf
      }
      return this.post(url, data).json()
    })
    .then(data => parser.parseTopicAnswers(data.msg[1]))
}

/**
 * Get pending questions of the topic.
 *
 * For more information about what is a pending question, see:
 * https://www.zhihu.com/question/40470324
 *
 * @param {number} page
 * @public
 */
Topic.prototype.pendingQuestions = function(page = 1) {
  var url = `/topic/${this._topic.id}/questions`
  var params = {
    page
  }

  return this.get(url, params)
    .then(parser.parseTopicQuestions)
}

/**
 * Get hot pending questions of the topic.
 *
 * For more information about what is a pending question, see:
 * https://www.zhihu.com/question/40470324
 *
 * @param {number} page
 * @public
 */
Topic.prototype.hotPendingQuestions = function(page = 1) {
  var url = `/topic/${this._topic.id}/unanswered`
  var params = {
    page
  }

  return this.get(url, params)
    .then(parser.parseTopicQuestions)
}
