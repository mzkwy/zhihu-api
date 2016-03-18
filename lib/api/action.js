const request = require('../request')
const urls = require('../urls')
const user = require('./user')

module.exports = {
    follow,
    unfollow
}

function follow(_user) {
    return _follow(_user, 'follow_member', urls.action.follow())
}

function unfollow(_user) {
    return _follow(_user, 'unfollow_member', urls.action.unfollow())
}

function _follow(_user, method, url) {
    var get_hash = user(_user)._hash()
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
