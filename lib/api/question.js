const parser = require('../parser')

module.exports = function(req) {
  /**
   * Initialize a `Question`.
   *
   * @param {number|object} id
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

  Question.prototype._req = req
  Object.assign(Question.prototype, proto)

  return Question
}

var proto = {
  /**
   * Get answers of the question by vote count.
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
            url_token: this._question.id,
            pagesize: 20,
            offset
          }),
          _xsrf
        }
        return this._req.post(url, data).json()
      })
      .then(data => parser.parseQuestionAnswersByVote(data.msg))
  }

  /**
   * Get answers of the question by page (or created time).
   *
   * @param {number} page
   * @public
   */
  answersByPage(page = 1) {
    var url = `/question/${this._question.id}`
    var params = {
      page,
      sort: 'created'
    }

    return this._req.get(url, params)
      .then(parser.parseQuestionAnswersByPage)
  }

  /**
   * Get detail of a question.
   *
   * @public
   */
  detail() {
    var url = `/question/${this._question.id}`
    return this._req.get(url)
      .then(parser.parseQuestionDetail)
  }

  /**
   * Get followers of a question.
   *
   * @param {number} offset
   * @public
   */
  followers(offset = 0) {
    return this._req.xsrf()
      .then(_xsrf => {
        var url = `/question/${this._question.id}/followers`
        var data = {
          start: 0,
          offset,
          _xsrf
        }
        return this._req.post(url, data).json()
      })
      .then(data => parser.parseQuestionFollowers(data.msg[1]))
  }
}
