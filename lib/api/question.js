const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

exports = module.exports = Question

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
 * The url is: https://www.zhihu.com/question/${questionId}
 * For example: https://www.zhihu.com/question/26753619
 */
proto.answersByVote = function(offset) {
    var questionId = this._question.id
    var url = urls.question.answersByVote()

    return request.xsrf()
        .then(_xsrf => ({
            method: 'next',
            params: JSON.stringify({
                url_token: questionId,
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
 * The url is: https://www.zhihu.com/question/${questionId}?sort=created
 * For example: https://www.zhihu.com/question/26753619?sort=created
 */
proto.answersByPage = function(page) {
    var questionId = this._question.id
    var url = urls.question.answersByPage(questionId, page)

    return request(url).then(parser.parseQuestionAnswersByPage)
}

/**
 * Get detail of a question.
 *
 * The url is: https://www.zhihu.com/question/${questionId}
 * For example: https://www.zhihu.com/question/26753619
 */
proto.detail = function() {
    var questionId = this._question.id
    var url = urls.question.home(questionId)

    return request(url).then(parser.parseQuestionDetail)
}

/**
 * Get followers of a question.
 *
 * The url is: https://www.zhihu.com/question/${questionId}/followers
 * For example: https://www.zhihu.com/question/26753619/followers
 */
proto.followers = function(offset) {
    var questionId = this._question.id
    var url = urls.question.followers(questionId)

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
