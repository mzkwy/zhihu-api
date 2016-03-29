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

var proto = Topic.prototype

Topic.root = function() {
    return Topic(19776749).hierarchy()
}

proto.hierarchy = function() {
    var id = this._topic.id

    return request(urls.topic.organize(id))
        .then(parser.parseTopicHierarchy)
}
