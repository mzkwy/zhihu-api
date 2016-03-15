const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

exports = module.exports = User

function User(_user) {
    if (!(this instanceof User)) {
        return new User(_user)
    }

    if (typeof _user === 'object') {
        this._user = _user
    } else {
        this._user = {
            uname: _user
        }
    }
}

var proto = User.prototype

proto.detail = function() {
    var uname = this._user.uname
    return request(urls.user.detail(uname))
        .then(parser.parseUserDetail)
}

proto.profile = function() {
    var uname = this._user.uname
    return request(urls.user.profile(uname))
        .then(parser.parseUserProfile)
}

proto.followers = function(offset) {
    var hash = this._user.hash
    if (hash) {
        return listFollows('followers', hash, offset)
    } else {
        return this.profile()
            .then(profile => this._user.hash = profile.hash)
            .then(() => {
                return listFollows('followers', this._user.hash, offset)
            })
    }
}

proto.followees = function(offset) {
    var hash = this._user.hash
    if (hash) {
        return listFollows('followees', hash, offset)
    } else {
        return this.profile()
            .then(profile => this._user.hash = profile.hash)
            .then(() => {
                return listFollows('followees', this._user.hash, offset)
            })
    }
}

proto.answers = function(page) {
    var uname = this._user.uname
    return request(urls.user.answers(uname, page))
        .then(parser.parseUserAnswers)
}

function listFollows(follow, hash_id, offset) {
    var followUrl = {
        followers: urls.user.followers(),
        followees: urls.user.followees()
    }
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
        .then(data => request(followUrl[follow], data))
        .then(data => {
            data = JSON.parse(data)
            return parser.parseUserFollows(data.msg)
        })
}
