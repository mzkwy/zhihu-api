const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

exports = module.exports = Answer

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

var proto = Answer.prototype

/**
 * Get voter of an answer.
 *
 * The url is: https://www.zhihu.com/answer/${aid}/voters_profile
 * For example: https://www.zhihu.com/answer/32208485/voters_profile
 */
proto.voters = function(next) {
    var url = next || urls.answer.voters(this._answer.aid)

    return request(url).then(data => {
        data = JSON.parse(data)

        return {
            voters: parser.parseAnswerVoters(data.payload),
            total: data.paging.total,
            next: data.paging.next ? urls.full(data.paging.next) : '',
            crawltime: Date.now()
        }
    })
}

/**
 * Get comments of an answer.
 *
 * The url is: https://www.zhihu.com/r/answers/${aid}/comments?page=${page}
 * For example: https://www.zhihu.com/r/answers/13111581/comments?page=2
 */
proto.comments = function(page) {
    var aid = this._answer.aid
    var url = urls.answer.comments(aid, page)

    return request(url)
        .then(data => JSON.parse(data))
        .then(parser.parseAnswerComments)
}

/**
 * Get today's hot answers.
 *
 * The url is: https://www.zhihu.com/explore
 */
Answer.exploreDay = function(offset) {
    return _explore(offset, 'day')
}

/**
 * Get this month's hot answer.
 *
 * The url is: https://www.zhihu.com/explore#monthly-hot
 */
Answer.exploreMonth = function(offset) {
    return _explore(offset, 'month')
}

function _explore(offset, type) {
    var url = urls.answer.explore(offset || 0, type)

    return request(url).then(parser.parseAnswerExplore)
}
