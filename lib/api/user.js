const cheerio = require('cheerio')
const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

const getAttr = parser.getAttr
const getText = parser.getText
const getData = parser.getData
const toNum = parser.toNum

exports = module.exports = user
exports.detail = getUserDetail
exports.profilecard = getProfileCard
exports.followers = listFollows('followers')
exports.followees = listFollows('followees')

function user(profile) {
    if (typeof profile === 'string') {
        profile = {
            uname: profile
        }
    }

    return {
        detail: function() {
            return getUserDetail(profile.uname)
        },
        profile: function() {
            return getProfileCard(profile.uname)
        }
    }
}

function getUserDetail(uname) {
    return request(urls.user.detail(uname))
        .then(_parseUserDetail)
        .catch(err => {
            throw new Error('user detail: ' + uname)
        })
}

function getProfileCard(uname) {
    return request(urls.user.profile(uname))
        .then(_parseProfileCard)
        .catch(err => {
            throw new Error('user profile card: ' + uname)
        })
}

function listFollows(follow) {
    var followUrl = {
        followers: urls.user.followers(),
        followees: urls.user.followees()
    }
    return function(profile, offset) {
        var hash_id = typeof profile === 'object' ? profile.hash : profile

        return request.xsrf()
            .then(_xsrf => ({
                method: 'next',
                params: JSON.stringify({
                    order_by: 'created',
                    hash_id,
                    offset
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

    var profile = {
        name: getText(nameEle),
        link: getAttr(nameEle, 'href'),
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
        agrees: toNum(getText(agreesEle)),
        thanks: toNum(getText(thanksEle)),
        hash: getData(hashEle, 'id'),
        asks: toNum(getText(asksEle)),
        answers: toNum(getText(answersEle)),
        posts: toNum(getText(postsEle)),
        collections: toNum(getText(collectionsEle)),
        logs: toNum(getText(logsEle)),
        followee: toNum(getText(followeeEle)),
        follower: toNum(getText(followerEle)),
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

    var profile = {
        link: getAttr(linkEle, 'href'),
        avatar: getAttr(avatarEle, 'src'),
        name: getText(nameEle),
        gender: getAttr(genderEle, 'class').substring('icon icon-profile-'.length),
        biology: getText(bioEle),
        answers: getText(answersEle),
        posts: getText(postsEle),
        follower: getText(followerEle),
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

        var profile = {
            hash: getData(hashEle, 'id'),
            link: getAttr(linkEle, 'href'),
            name: getAttr(linkEle, 'title')
        }

        return profile
    })

    return follows
}
