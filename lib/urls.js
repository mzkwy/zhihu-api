const querystring = require('querystring')

const baseurl = 'https://www.zhihu.com'

function id(val) {
    return function() {
        return val
    }
}

exports = module.exports = {}

exports._baseurl = baseurl
exports.index = id(baseurl)

exports.full = function(path) {
    return baseurl + path
}

exports.user = {
    home: function(uname) {
        return baseurl + '/people/' + uname
    },
    detail: function(uname) {
        return baseurl + '/people/' + uname + '/about'
    },
    profile: function(uname) {
        var profileUrl = baseurl + '/node/MemberProfileCardV2'
        var params = querystring.stringify({
            params: JSON.stringify({
                'url_token': uname
            })
        })
        return profileUrl + '?' + params
    },
    followers: id(baseurl + '/node/ProfileFollowersListV2'),
    followees: id(baseurl + '/node/ProfileFolloweesListV2'),
    questions: function(uname, page) {
        return baseurl + '/people/' + uname + '/asks?page=' + (page || 1)
    },
    answers: function(uname, page) {
        return baseurl + '/people/' + uname + '/answers?page=' + (page || 1)
    },
    posts: function(uname, page) {
        return baseurl + '/people/' + uname + '/posts?page=' + (page || 1)
    },
    collections: function(uname, page) {
        return baseurl + '/people/' + uname + '/collections?page=' + (page || 1)
    },
    topics: function(uname) {
        return baseurl + '/people/' + uname + '/topics'
    },
    columns: id(baseurl + '/node/ProfileFollowedColumnsListV2')
}

exports.question = {
    home: function(id) {
        return baseurl + '/question/' + id
    },
    answersByVote: id(baseurl + '/node/QuestionAnswerListV2'),
    answersByPage: function(id, page) {
        var params = querystring.stringify({
            sort: 'created',
            page: page || 1
        })
        return baseurl + '/question/' + id + '?' + params
    },
    followers: function(id) {
        return baseurl + '/question/' + id + '/followers'
    }
}

exports.answer = {
    voters: function(answerId) {
        return baseurl + '/answer/' + answerId + '/voters_profile'
    }
}

exports.action = {
    follow: id(baseurl + '/node/MemberFollowBaseV2'),
    followTopic: id(baseurl + '/node/TopicFollowBaseV2'),
    followQuestion: id(baseurl + '/node/QuestionFollowBaseV2'),
    voteAnswer: id(baseurl + '/node/AnswerVoteBarV2'),
    sendMessage: id(baseurl + '/inbox/post'),
    block: function(uname) {
        return baseurl + '/people/' + uname + '/block'
    }
}

exports.topic = {
    organize: function(id) {
        return baseurl + '/topic/' + id + '/organize'
    },
    followers: function(id) {
        return baseurl + '/topic/' + id + '/followers'
    },
    topAnswers: function(id, page) {
        return baseurl + '/topic/' + id + '/top-answers?page=' + (page || 1)
    },
    hotAnswers: function(id) {
        return baseurl + '/topic/' + id + '/hot'
    },
    newAnswers: function(id) {
        return baseurl + '/topic/' + id + '/newest'
    },
    pendingQuestions: function(id, page) {
        return baseurl + '/topic/' + id + '/questions?page=' + (page || 1)
    },
    hotPendingQuestions: function(id, page) {
        return baseurl + '/topic/' + id + '/unanswered?page=' + (page || 1)
    }
}
