const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum

module.exports = {
    parseUserDetail,
    parseUserProfile,
    parseUserFollows,
    parseUserActivity
}

function parseUserDetail(html) {
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
        link: urls.full(link),
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

    // if you are blocked by this user
    // or it's yourself
    if (!profile.hash) {
        var currentEle = $('.json-inline[data-name="current_people"]')
        var info = JSON.parse(getText(currentEle))
        profile.hash = info[3]
    }

    return profile
}

function parseUserProfile(html) {
    var $ = cheerio.load(html)
    var upperEle = $('.upper')
    var lowerEle = $('.lower')

    var linkEle = $('.avatar-link', upperEle)
    var avatarEle = $('.Avatar', upperEle)
    var nameEle = $('.name', upperEle)
    var genderEle = $('i.icon-profile-male', upperEle) || $('i.icon-profile-female', upperEle)
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
        link: urls.full(link),
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

function parseUserFollows(htmls) {
    var follows = htmls.map(html => {
        var $ = cheerio.load(html)
        var hashEle = $('.zm-rich-follow-btn')
        var linkEle = $('.zm-item-link-avatar')

        var link = getAttr(linkEle, 'href')

        var profile = {
            name: getAttr(linkEle, 'title'),
            uname: link.substring('/people/'.length),
            link: urls.full(link),
            hash: getData(hashEle, 'id')
        }

        return profile
    })

    return follows
}

function parseUserActivity(html) {
    var $ = cheerio.load(html)
    var items = $('#zh-profile-activity-page-list > .zm-item')

    if (!items.length) {
        return null
    }

    var item = $(items[0])

    var activity = {
        time: getData(item, 'time') * 1000,
        type: getData(item, 'type-detail'),
        crawltime: Date.now()
    }

    return activity
}
