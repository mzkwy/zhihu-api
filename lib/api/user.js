const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

exports = module.exports = User

function User(uname) {
    if (!(this instanceof User)) {
        return new User(uname)
    }

    if (typeof uname === 'object') {
        this._user = uname
    } else {
        this._user = {
            uname
        }
    }
}

var proto = User.prototype

/**
 * Get the user's detail profile.
 *
 * The url is: https://www.zhihu.com/people/${uname}/about
 * For example: https://www.zhihu.com/people/zhihuadmin/about
 */
proto.detail = function() {
    var uname = this._user.uname
    var url = urls.user.detail(uname)

    return request(url).then(parser.parseUserDetail)
}

/**
 * Get the user's profile.
 *
 * The url is:
 * https://www.zhihu.com/node/MemberProfileCardV2?params={"url_token":"${uname}"}
 * For example:
 * https://www.zhihu.com/node/MemberProfileCardV2?params={"url_token":"zhihuadmin"}
 */
proto.profile = function() {
    var uname = this._user.uname
    var url = urls.user.profile(uname)

    return request(url).then(parser.parseUserProfile)
}

/**
 * Get the user's followers.
 *
 * The url is: https://www.zhihu.com/people/${uname}/followers
 * For example: https://www.zhihu.com/people/zhihuadmin/followers
 */
proto.followers = function(offset) {
    return this._hash()
        .then(hash => listFollows('followers', hash, offset))
}

/**
 * Get the user's followees.
 *
 * The url is: https://www.zhihu.com/people/${uname}/followees
 * For example: https://www.zhihu.com/people/zhihuadmin/followees
 */
proto.followees = function(offset) {
    return this._hash()
        .then(hash => listFollows('followees', hash, offset))
}

function listFollows(follow, hash_id, offset) {
    var url = urls.user[follow]()

    return request.xsrf()
        .then(_xsrf => ({
            method: 'next',
            params: JSON.stringify({
                order_by: 'created',
                offset: offset || 0,
                hash_id
            }),
            _xsrf
        }))
        .then(data => request(url, data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseUserFollows(data.msg)
        })
}

/**
 * Get the user's latest activity.
 *
 * The url is: https://www.zhihu.com/people/${uname}
 * For example: https://www.zhihu.com/people/zhihuadmin
 */
proto.latestActivity = function() {
    var uname = this._user.uname
    var url = urls.user.home(uname)

    return request(url).then(parser.parseUserActivity)
}

/**
 * Get the user's answers.
 *
 * The url is: https://www.zhihu.com/people/${uname}/answers
 * For example: https://www.zhihu.com/people/zhihuadmin/answers
 */
proto.answers = function(page) {
    var uname = this._user.uname
    var url = urls.user.answers(uname, page)

    return request(url).then(parser.parseUserAnswers)
}

/**
 * Get the user's collections.
 *
 * The url is: https://www.zhihu.com/people/${uname}/collections
 * For example: https://www.zhihu.com/people/zhihuadmin/collections
 */
proto.collections = function(page) {
    var uname = this._user.uname
    var url = urls.user.collections(uname, page)

    return request(url).then(parser.parseUserCollections)
}

/**
 * Get the user's column posts.
 *
 * The url is: https://www.zhihu.com/people/${uname}/posts
 * For example: https://www.zhihu.com/people/zhihuadmin/posts
 */
proto.columns = function() {
    var uname = this._user.uname
    var url = urls.user.columns(uname)

    return request(url).then(parser.parseUserColumns)
}

/**
 * Get topics that the user followed.
 *
 * The url is: https://www.zhihu.com/people/${uname}/topics
 * For example: https://www.zhihu.com/people/zhihuadmin/topics
 */
proto.topics = function(offset) {
    var uname = this._user.uname
    var url = urls.user.topics(uname)

    return request.xsrf()
        .then(_xsrf => ({
            start: 0,
            offset: offset || 0,
            _xsrf
        }))
        .then(data => request(url, data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseUserTopics(data.msg[1])
        })
}

/**
 * Get columns that the user followed.
 *
 * The url is: https://www.zhihu.com/people/${uname}/columns/followed
 * For example: https://www.zhihu.com/people/excited-vczh/columns/followed
 */
proto.followedColumns = function(offset) {
    var get_hash = this._hash()
    var get_xsrf = request.xsrf()
    var url = urls.user.followedColumns()

    return Promise.all([get_hash, get_xsrf])
        .then(arr => ({
            method: 'next',
            params: JSON.stringify({
                offset: offset || 0,
                limit: 20,
                hash_id: arr[0]
            }),
            _xsrf: arr[1]
        }))
        .then(data => request(url, data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseUserFollowedColumns(data.msg)
        })
}

/**
 * Get the user's hash.
 */
proto._hash = function() {
    var hash = this._user.hash
    if (hash) {
        return Promise.resolve(hash)
    } else {
        return this.detail()
            .then(detail => {
                this._user.hash = detail.hash
                return detail.hash
            })
    }
}
