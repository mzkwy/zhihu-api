const fs = require('fs')
const path = require('path')
const querystring = require('querystring')

var userAgent = ['Mozilla/5.0 (Windows NT 6.3; WOW64)',
    'AppleWebKit/537.36 (KHTML, like Gecko)',
    'Chrome/48.0.2564.116 Safari/537.36'
].join(' ')

var headers = {
    'User-Agent': userAgent,
    'Cookie': ''
}

function setCookie(cookiePath) {
    try {
        var cookie = fs.readFileSync(cookiePath)
        headers['Cookie'] = cookie.toString()
    } catch (e) {
        throw new Error('Error occurs get cookie')
    }
}

var baseurl = 'https://www.zhihu.com'
var urls = {
    index: baseurl,
    terms: baseurl + '/terms',
    questions: baseurl + '/log/questions',
    question: function(qid) {
        return baseurl + '/question/' + qid
    },
    answer: {
        byPage: function(questionId, page) {
            var params = querystring.stringify({
                sort: 'created',
                page: page || 1
            })
            return baseurl + '/question/' + questionId + '?' + params
        },
        byVote: baseurl + '/node/QuestionAnswerListV2'
    },
    user: {
        detail: function(uname) {
            return baseurl + '/people/' + uname + '/about'
        },
        profilecard: function(uname) {
            var cardurl = baseurl + '/node/MemberProfileCardV2'
            var params = querystring.stringify({
                params: JSON.stringify({
                    'url_token': uname
                })
            })
            return cardurl + (params ? '?' + params : '')
        }
    },
    followers: baseurl + '/node/ProfileFollowersListV2',
    followees: baseurl + '/node/ProfileFolloweesListV2'
}

module.exports = {
    setCookie,
    headers,
    urls
}
