const request = require('../request')
const urls = require('../urls')
const user = require('./user')

module.exports = {
    follow,
    unfollow,
    sendMessage
}

function follow(uname) {
    return _follow(uname, 'follow_member', urls.action.follow())
}

function unfollow(uname) {
    return _follow(uname, 'unfollow_member', urls.action.unfollow())
}

function _follow(uname, method, url) {
    var get_hash = user(uname)._hash()
    var get_xsrf = request.xsrf()

    return Promise.all([get_hash, get_xsrf])
        .then(arr => ({
            method: method,
            params: JSON.stringify({
                hash_id: arr[0]
            }),
            _xsrf: arr[1]
        }))
        .then(data => request(url, data))
        .then(data => JSON.parse(data))
}

function sendMessage(uname, msg) {
    var get_xsrf = request.xsrf()
    var get_hash = user(uname)._hash()

    return Promise.all([get_xsrf, get_hash])
        .then(arr => ({
            member_id: arr[1],
            content: msg,
            token: '',
            _xsrf: arr[0]
        }))
        .then(data => request(urls.action.sendMessage(), data))
        .then(data => JSON.parse(data))
}
