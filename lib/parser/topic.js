const cheerio = require('cheerio')
const util = require('./util')
const urls = require('../urls')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum

module.exports = {
    parseTopicHierarchy,
    parseTopicFollowers
}

function parseTopicHierarchy(html) {
    var $ = cheerio.load(html)

    var linkEle = $('.topic-avatar .zm-entry-head-avatar-link')
    var avatarEle = $('img', linkEle)
    var parentEles = $('#zh-topic-organize-parent-editor .zm-item-tag')
    var childEles = $('#zh-topic-organize-child-editor .zm-item-tag')
    var sidebarEle = $('#zh-topic-side-head')
    var focusEle = $('.zu-entry-focus-button', sidebarEle)
    var followerEle = $('.zm-topic-side-followers-info strong', sidebarEle)

    var link = getAttr(linkEle, 'href')
    var topic = {
        id: toNum(link.substring('/topic/'.length)),
        tid: toNum(getAttr(focusEle, 'id').substring('tf-'.length)),
        link: urls.full(link),
        name: getAttr(avatarEle, 'alt'),
        avatar: getAttr(avatarEle, 'src'),
        followers: toNum(getText(followerEle)),
        parents: _parseHierarchyLabels($, parentEles),
        children: _parseHierarchyLabels($, childEles),
        crawltime: Date.now()
    }

    return topic
}

function _parseHierarchyLabels($, eles) {
    if (!eles || !eles.length) {
        return []
    }

    var topics = []

    for (var i = 0; i < eles.length; i++) {
        var ele = $(eles[i])
        var link = getAttr(ele, 'href').replace('/organize', '')

        var topic = {
            id: getData(ele, 'token'),
            tid: getData(ele, 'topicid'),
            name: getText(ele).trim(),
            link: urls.full(link)
        }

        topics.push(topic)
    }

    return topics
}

function parseTopicFollowers(html) {
    var $ = cheerio.load(html)
    var items = $('.zm-person-item')

    if (!items.length) {
        return []
    }

    var followers = []

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var followEle = $('.zg-btn-follow', item)
        var avatarEle = $('.zm-list-avatar-medium img', item)
        var nameEle = $('.zm-list-content-title a', item)

        var link = getAttr(nameEle, 'href')

        var follower = {
            name: getText(nameEle),
            uname: link.substring('/people/'.length),
            link: urls.full(link),
            avatar: getAttr(avatarEle, 'src'),
            hash: getAttr(followEle, 'id').substring('pp-'.length),
            followtime: toNum(getAttr(item, 'id').substring('mi-'.length)) * 1000
        }

        followers.push(follower)
    }

    return followers
}
