const parser = require('../parser/question')
const baseurl = require('../urls').baseurl

module.exports = function(req) {
  /**
   * Initialize a `Question`.
   *
   * @param {number} id
   * @public
   */
  function Question(id) {
    if (!(this instanceof Question)) {
      return new Question(id)
    }

    this.id = id
    this.url = `${baseurl}/question/${this.id}`
  }

  Question.prototype._req = req
  Object.assign(Question.prototype, proto)

  return Question
}

var proto = {
  /**
   * Answers by voteup weights.
   *
   * @param {number} offset
   * @public
   */
  answersByVote(offset = 0) {
    return this._req.xsrf()
      .then(_xsrf => {
        var url = '/node/QuestionAnswerListV2'
        var data = {
          method: 'next',
          params: JSON.stringify({
            url_token: this.id,
            pagesize: 20,
            offset
          }),
          _xsrf
        }
        return this._req.post(url, data).json()
      })
      .then(data => parser.answersByVote(data.msg))
  },

  /**
   * Answers by page (or created time).
   *
   * @param {number} page
   * @public
   */
  answersByPage(page = 1) {
    var url = `/question/${this.id}`
    var params = {
      page,
      sort: 'created'
    }

    return this._req.get(url, params)
      .then(parser.answersByPage)
  },

  /**
   * Get detail of a question.
   *
   * @public
   */
  detail() {
    var url = `/question/${this.id}`
    return this._req.get(url)
      .then(parser.detail)
  },

  /**
   * Get followers of a question.
   *
   * @param {number} offset
   * @public
   */
  followers(offset = 0) {
    return this._req.xsrf()
      .then(_xsrf => {
        var url = `/question/${this.id}/followers`
        var data = {
          start: 0,
          offset,
          _xsrf
        }
        return this._req.post(url, data).json()
      })
      .then(data => parser.followers(data.msg[1]))
  }
}
