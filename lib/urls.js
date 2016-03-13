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

exports.user = {
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
    answers: function(uname) {
        return baseurl + '/people/' + uname + '/answers'
    }
}

exports.answer = {
    byVote: id(baseurl + '/node/QuestionAnswerListV2'),
    byPage: function(questionId, page) {
        var params = querystring.stringify({
            sort: 'created',
            page: page || 1
        })
        return baseurl + '/question/' + questionId + '?' + params
    }
}

exports.question = {
    byId: function(questionId) {
        return baseurl + '/question/' + questionId
    },
    latest: id(baseurl + '/log/questions')
}
