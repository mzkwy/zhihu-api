const cheerio = require('cheerio')
const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

const getAttr = parser.getAttr
const getText = parser.getText
const getData = parser.getData
const toNum = parser.toNum

exports = module.exports = User

function User(_user) {
    if (!(this instanceof User)) {
        return new User(_user)
    }

    if (typeof _user === 'string') {
        this._user = {
            uname: _user
        }
    } else {
        this._user = _user
    }
}

var proto = User.prototype

proto.detail = function() {
    var uname = this._user.uname
    return request(urls.user.detail(uname))
        .then(_parseUserDetail)
        .catch(err => {
            throw new Error('user detail: ' + uname)
        })
}

proto.profile = function() {
    var uname = this._user.uname
    return request(urls.user.profile(uname))
        .then(_parseProfileCard)
        .catch(err => {
            throw new Error('user profile card: ' + uname)
        })
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
            return _parseFollows(data.msg)
        })
        .catch(err => {
            var params = JSON.stringify({
                hash_id,
                offset
            })
            throw new Error('user ' + follow + ': ' + params)
        })
}

function _parseUserDetail(html) {
    var $ = cheerio.load(html)
    var profileMainEle = $('.zm-profile-header-main')
    var profileInfoEle = $('.zm-profile-header-info')
    var profileOpeEle = $('.zm-profile-header-operation')
    var profileNavEle = $('.profile-navbar')
    var followEle = $('.zm-profile-side-following')

    var nameEle = $('.name', profileMainEle)
    var bioEle = $('.bio', profileMainEle)
    var weiboEle = $('.zm-profile-header-user-weibo', profileMainEle)
    var avatarEle = $('.Avatar', profileMainEle)

    var locationEle = $('.item.location', profileInfoEle)
    var businessEle = $('.item.business', profileInfoEle)
    var genderEle = $('.item.gender .icon', profileInfoEle)
    var companyEle = $('.item.employment', profileInfoEle)
    var positionEle = $('.item.position', profileInfoEle)
    var schoolEle = $('.item.education', profileInfoEle)
    var majorEle = $('.item.education-extra', profileInfoEle)
    var descriptionEle = $('.description.unfold-item > .content', profileInfoEle)

    var agreesEle = $('.zm-profile-header-user-agree > strong', profileOpeEle)
    var thanksEle = $('.zm-profile-header-user-thanks > strong', profileOpeEle)
    var hashEle = $('.zm-rich-follow-btn', profileOpeEle)

    var navEles = $('.item', profileNavEle)
    var asksEle = $('.num', navEles[1])
    var answersEle = $('.num', navEles[2])
    var postsEle = $('.num', navEles[3])
    var collectionsEle = $('.num', navEles[4])
    var logsEle = $('.num', navEles[5])

    var followeeEle = $('.item:first-child > strong', followEle)
    var followerEle = $('.item:last-child > strong', followEle)

    var link = getAttr(nameEle, 'href')

    var profile = {
        name: getText(nameEle),
        uname: link.substring('/people/'.length),
        link: urls._baseurl + link,
        biology: getAttr(bioEle, 'title'),
        weibo: getAttr(weiboEle, 'href'),
        avatar: getAttr(avatarEle, 'src'),
        location: getAttr(locationEle, 'title'),
        business: getAttr(businessEle, 'title'),
        gender: getAttr(genderEle, 'class').substring('icon icon-profile-'.length),
        company: getAttr(companyEle, 'title'),
        position: getAttr(positionEle, 'title'),
        school: getAttr(schoolEle, 'title'),
        major: getAttr(majorEle, 'title'),
        description: getText(descriptionEle).trim(),
        hash: getData(hashEle, 'id'),
        agrees: toNum(getText(agreesEle)),
        thanks: toNum(getText(thanksEle)),
        asks: toNum(getText(asksEle)),
        answers: toNum(getText(answersEle)),
        posts: toNum(getText(postsEle)),
        collections: toNum(getText(collectionsEle)),
        logs: toNum(getText(logsEle)),
        followees: toNum(getText(followeeEle)),
        followers: toNum(getText(followerEle)),
        crawltime: Date.now()
    }

    return profile
}

function _parseProfileCard(html) {
    var $ = cheerio.load(html)
    var upperEle = $('.upper')
    var lowerEle = $('.lower')

    var linkEle = $('.avatar-link', upperEle)
    var avatarEle = $('.Avatar', upperEle)
    var nameEle = $('.name', upperEle)
    var genderEle = $('i.icon', upperEle)
    var bioEle = $('.tagline', upperEle)

    var metaEles = $('.meta .item', lowerEle)
    var answersEle = $('.value', metaEles[0])
    var postsEle = $('.value', metaEles[1])
    var followerEle = $('.value', metaEles[2])
    var hashEle = $('.zm-rich-follow-btn', lowerEle)

    var link = getAttr(linkEle, 'href')

    var profile = {
        name: getText(nameEle),
        uname: link.substring('/people/'.length),
        link: urls._baseurl + getAttr(linkEle, 'href'),
        avatar: getAttr(avatarEle, 'src'),
        gender: getAttr(genderEle, 'class').substring('icon icon-profile-'.length),
        biology: getText(bioEle),
        answers: getText(answersEle),
        posts: getText(postsEle),
        followers: getText(followerEle),
        hash: getData(hashEle, 'id'),
        crawltime: Date.now()
    }

    return profile
}

function _parseFollows(htmls) {
    var follows = htmls.map(html => {
        var $ = cheerio.load(html)
        var hashEle = $('.zm-rich-follow-btn')
        var linkEle = $('.zm-item-link-avatar')

        var link = getAttr(linkEle, 'href')

        var profile = {
            name: getAttr(linkEle, 'title'),
            uname: link.substring('/people/'.length),
            link: urls._baseurl + link,
            hash: getData(hashEle, 'id')
        }

        return profile
    })

    return follows
}
