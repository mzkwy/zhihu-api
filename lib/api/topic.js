const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

exports = module.exports = Topic

function Topic(_topic) {
    if (!(this instanceof Topic)) {
        return new Topic(_topic)
    }

    if (typeof _topic === 'object') {
        this._topic = _topic
    } else {
        this._topic = {
            id: _topic
        }
    }
}

Topic.root = Topic(19776749)

var proto = Topic.prototype

/**
 * Get the hierarchy information of the topic.
 *
 * The url is: https://www.zhihu.com/topic/${topicId}/organize
 * For example: https://www.zhihu.com/topic/19554791/organize
 * The root topic is: https://www.zhihu.com/topic/19776749/organize
 * For entire hierarchy of the topic, see:
 * https://www.zhihu.com/topic/${topicId}/organize/entire
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
 * The url is: https://www.zhihu.com/topic/${topicId}/followers
 * For example: https://www.zhihu.com/topic/19554791/followers
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
 * The url is: https://www.zhihu.com/topic/${topicId}/top-answers
 * For example: https://www.zhihu.com/topic/19554791/top-answers
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
 * The url is: https://www.zhihu.com/topic/${topicId}/hot
 * For example: https://www.zhihu.com/topic/19554791/hot
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
 * The url is: https://www.zhihu.com/topic/${topicId}/newest
 * For example: https://www.zhihu.com/topic/19554791/newest
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
 * The url is: https://www.zhihu.com/topic/${topicId}/questions
 * For example: https://www.zhihu.com/topic/19554791/questions
 * For more information about what is a pending question, see:
 * https://www.zhihu.com/question/40470324
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
 * The url is: https://www.zhihu.com/topic/${topicId}/unanswered
 * For example: https://www.zhihu.com/topic/19554791/unanswered
 * For more information about what is a pending question, see:
 * https://www.zhihu.com/question/40470324
 */
proto.hotPendingQuestions = function(page) {
    var id = this._topic.id
    var url = urls.topic.hotPendingQuestions(id, page)

    return request(url)
        .then(parser.parseTopicQuestions)
}
