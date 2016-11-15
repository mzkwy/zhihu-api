const parser = require('../parser')
const urls = require('../urls')

module.exports = Answer

/**
 * Initialize an `Answer`.
 *
 * @param {number|object} aid
 * @public
 */
function Answer(aid) {
  if (!(this instanceof Answer)) {
    return new Answer(aid)
  }

  if (typeof aid === 'object') {
    this._answer = aid
  } else {
    this._answer = {
      aid
    }
  }
}

/**
 * Get voter of an answer.
 *
 * @param {string} next a url string
 * @public
 */
Answer.prototype.voters = function(next) {
  var url = next || `/answer/${this._answer.aid}/voters_profile`

  return this.get(url)
    .json()
    .then(data => ({
      voters: parser.parseAnswerVoters(data.payload),
      total: data.paging.total,
      next: data.paging.next ? urls.full(data.paging.next) : '',
      crawltime: Date.now()
    }))
}

/**
 * Get comments of an answer.
 *
 * @param {number} page
 * @public
 */
Answer.prototype.comments = function(page = 1) {
  var url = `/r/answers/${this._answer.aid}/comments`
  var params = {
    page
  }

  return this.get(url, params)
    .json()
    .then(parser.parseAnswerComments)
}

/**
 * Get today's hot answers.
 *
 * The url is: https://www.zhihu.com/explore
 *
 * @param {number} offset
 * @public
 */
Answer.exploreDay = function(offset = 0) {
  return _explore(offset, 'day')
}

/**
 * Get this month's hot answer.
 *
 * The url is: https://www.zhihu.com/explore#monthly-hot
 *
 * @param {number} offset
 * @public
 */
Answer.exploreMonth = function(offset = 0) {
  return _explore(offset, 'month')
}

function _explore(offset, type) {
  var url = '/node/ExploreAnswerListV2'
  var params = {
    params: JSON.stringify({
      offset,
      type
    })
  }

  return Answer.prototype.get(url, params)
    .then(parser.parseAnswerExplore)
}
