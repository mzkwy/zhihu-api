const parser = require('../parser')

module.exports = function(req) {
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

  Topic.root = new Topic(19776749)

  Topic.prototype._req = req
  Object.assign(Topic.prototype, proto)

  return Topic
}

var proto = {
  /**
   * Get the hierarchy information of the topic.
   *
   * @public
   */
  hierarchy() {
    var url = `/topic/${this._topic.id}/organize`
    return this._req.get(url)
      .then(parser.parseTopicHierarchy)
  }

  /**
   * Get followers of the topic.
   *
   * @param {number} start  timestamp in seconds
   * @param {number} offset
   * @public
   */
  followers(start = '', offset = 0) {
    return this._req.xsrf()
      .then(_xsrf => {
        var url = `/topic/${this._topic.id}/followers`
        var data = {
          start,
          offset,
          _xsrf
        }
        return this._req.post(url, data).json()
      })
      .then(data => parser.parseTopicFollowers(data.msg[1]))
  }

  /**
   * Get top answers of the topic.
   *
   * @param {number} page
   * @public
   */
  topAnswers(page = 1) {
    var url = `/topic/${this._topic.id}/top-answers`
    var params = {
      page
    }

    return this._req.get(url, params)
      .then(parser.parseTopicAnswers)
  }

  /**
   * Get hot answers of the topic.
   *
   * @param {number} offset answer score
   * @public
   */
  hotAnswers(offset = '') {
    return this._req.xsrf()
      .then(_xsrf => {
        var url = `/topic/${this._topic.id}/hot`
        var data = {
          start: 0,
          offset,
          _xsrf
        }
        return this._req.post(url, data).json()
      })
      .then(data => parser.parseTopicAnswers(data.msg[1]))
  }

  /**
   * Get new answers of the topic.
   *
   * @param {number} offset answer score
   * @public
   */
  newAnswers(offset = '') {
    return this._req.xsrf()
      .then(_xsrf => {
        var url = `/topic/${this._topic.id}/newest`
        var data = {
          start: 0,
          offset,
          _xsrf
        }
        return this._req.post(url, data).json()
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
  pendingQuestions(page = 1) {
    var url = `/topic/${this._topic.id}/questions`
    var params = {
      page
    }

    return this._req.get(url, params)
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
  hotPendingQuestions(page = 1) {
    var url = `/topic/${this._topic.id}/unanswered`
    var params = {
      page
    }

    return this._req.get(url, params)
      .then(parser.parseTopicQuestions)
  }
}
