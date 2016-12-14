const parser = require('../parser/answer')

module.exports = function(req) {
  /**
   * Initialize an `Answer`.
   *
   * @param {Number} id
   * @public
   */
  function Answer(id) {
    if (!(this instanceof Answer)) {
      return new Answer(id)
    }

    this.id = id
  }

  bindStaticMethods(Answer, req)

  Answer.prototype._req = req
  Object.assign(Answer.prototype, proto)

  return Answer
}

var proto = {
  /**
   * Answer voters.
   *
   * @param  {Number} offset
   * @return {Promise}
   * @public
   */
  voters(offset = 0) {
    var url = `/api/v4/answers/${this.id}/voters`
    var params = {
      offset,
      limit: 20
    }

    return this._req.get(url, params)
      .then(parser.voters)
  },

  /**
   * Answer comments.
   *
   * @param  {Number} offset
   * @return {Promise}
   * @public
   */
  comments(offset = 0) {
    var url = `/api/v4/answers/${this.id}/comments`
    var params = {
      offset,
      limit: 20,
      order: 'normal',
      status: 'open',
      include: 'data[*].author,reply_to_author,content,vote_count'
    }

    return this._req.get(url, params)
      .then(parser.comments)
  }
}

/**
 * @private
 */
function bindStaticMethods(Answer, req) {
  /**
   * Get today's hot answers.
   *
   * The url is: https://www.zhihu.com/explore
   *
   * @param  {Number} offset
   * @return {Promise}
   * @public
   */
  Answer.exploreDay = function(offset = 0) {
    return _explore(Answer, req, offset, 'day')
  }

  /**
   * Get this month's hot answer.
   *
   * The url is: https://www.zhihu.com/explore#monthly-hot
   *
   * @param  {Number} offset
   * @return {Promise}
   * @public
   */
  Answer.exploreMonth = function(offset = 0) {
    return _explore(Answer, req, offset, 'month')
  }
}

/**
 * @private
 */
function _explore(Answer, req, offset, type) {
  var url = '/node/ExploreAnswerListV2'
  var params = {
    params: JSON.stringify({
      offset,
      type
    })
  }

  return req.get(url, params, true)
    .then(parser.explore)
}
