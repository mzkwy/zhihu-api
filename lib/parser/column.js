const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const toNum = util.toNum

module.exports = {
    parseUserColumns
}

function parseUserColumns(html) {
    var $ = cheerio.load(html)
    var items = $('#zh-profile-posts .column')

    if (!items.length) {
        return []
    }

    var columns = []
    var currentEle = $('.json-inline[data-name="current_people"]')
    var info = JSON.parse(getText(currentEle))
    var user = {
        name: info[0],
        uname: info[1],
        link: urls.full('/people/' + info[1])
    }

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var linkEle = $('.header > a', item)
        var avatarEle = $('.Avatar', linkEle)
        var followEle = $('.header .followers-link', item)
        var postEle = $('.posts .post', item)
        var footerEle = $('.footer > a', item)

        var link = getAttr(linkEle, 'href')

        var column = {
            name: getAttr(avatarEle, 'alt'),
            avatar: getAttr(avatarEle, 'src'),
            link: link,
            uname: link.substring(link.lastIndexOf('/') + 1),
            followers: toNum(getText(followEle).split(' ')[0]),
            posts: toNum(getText(footerEle).split(' ')[1]) || postEle.length,
            crawltime: Date.now(),
            user
        }

        columns.push(column)
    }

    return columns
}
