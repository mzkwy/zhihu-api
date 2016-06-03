const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

exports = module.exports = Question

/**
 * Initialize `Question` with given `id`.
 *
 * If `id` is an object, then it must have an `id` property.
 *
 * @param {Number|Object} id
 * @public
 */
function Question(id) {
  if (!(this instanceof Question)) {
    return new Question(id)
  }

  if (typeof id === 'object') {
    this._question = id
  } else {
    this._question = {
      id
    }
  }
}

var proto = Question.prototype

/**
 * Get answers of the question by vote count.
 *
 * The url is: https://www.zhihu.com/question/${id}
 * For example: https://www.zhihu.com/question/26753619
 *
 * @param {Number} [offset=0]
 * @public
 */
proto.answersByVote = function(offset) {
  var id = this._question.id
  var url = urls.question.answersByVote()

  return request.xsrf()
    .then(_xsrf => ({
      method: 'next',
      params: JSON.stringify({
        url_token: id,
        pagesize: 20,
        offset: offset || 0
      }),
      _xsrf
    }))
    .then(data => request(url, data))
    .then(data => {
      data = JSON.parse(data)
      return parser.parseQuestionAnswersByVote(data.msg)
    })
}

/**
 * Get answers of the question by page (or created time).
 *
 * The url is: https://www.zhihu.com/question/${id}?sort=created
 * For example: https://www.zhihu.com/question/26753619?sort=created
 *
 * @param {Number} [page=1]
 * @public
 */
proto.answersByPage = function(page) {
  var id = this._question.id
  var url = urls.question.answersByPage(id, page)

  return request(url).then(parser.parseQuestionAnswersByPage)
}

/**
 * Get detail of a question.
 *
 * The url is: https://www.zhihu.com/question/${id}
 * For example: https://www.zhihu.com/question/26753619
 *
 * @public
 */
proto.detail = function() {
  var id = this._question.id
  var url = urls.question.home(id)

  return request(url).then(parser.parseQuestionDetail)
}

/**
 * Get followers of a question.
 *
 * The url is: https://www.zhihu.com/question/${id}/followers
 * For example: https://www.zhihu.com/question/26753619/followers
 *
 * @param {Number} [offset=0]
 * @public
 */
proto.followers = function(offset) {
  var id = this._question.id
  var url = urls.question.followers(id)

  return request.xsrf()
    .then(_xsrf => ({
      start: 0,
      offset: offset || 0,
      _xsrf
    }))
    .then(data => request(url, data))
    .then(data => {
      data = JSON.parse(data)
      return parser.parseQuestionFollowers(data.msg[1])
    })
}
