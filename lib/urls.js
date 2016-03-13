const querystring = require('querystring')

const baseurl = 'https://www.zhihu.com'

function id(val) {
    return function() {
        return val
    }
}

exports = module.exports = {}

exports.index = id(baseurl)

exports.followers = id(baseurl + '/node/ProfileFollowersListV2')
exports.followees = id(baseurl + '/node/ProfileFolloweesListV2')

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
        return cardurl + '?' + params
    },
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
