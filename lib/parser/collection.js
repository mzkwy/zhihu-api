const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const toNum = util.toNum

module.exports = {
    parseUserCollections
}

function parseUserCollections(html) {
    var $ = cheerio.load(html)
    var items = $('#zh-profile-fav-list .zm-profile-section-item')

    if (!items.length) {
        return []
    }

    var collections = []
    var currentEle = $('.json-inline[data-name="current_people"]')
    var info = JSON.parse(getText(currentEle))
    var user = {
        name: info[0],
        uname: info[1],
        link: urls.full('/people/' + info[1])
    }

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var titleEle = $('.zm-profile-fav-item-title', item)
        var metaEle = $('.zm-profile-fav-bio', item)
        var followEle = $('.zg-btn-follow', item)

        var link = getAttr(titleEle, 'href')
        var meta = getText(metaEle).trim().split('•')

        var collection = {
            name: getText(titleEle),
            id: toNum(link.substring('/collection/'.length)),
            fvid: toNum(getAttr(followEle, 'id').substring('/fv-/'.length)),
            link: urls.full(link),
            answers: toNum(meta[0].split(' ')[0]),
            followers: toNum(meta[1].split(' ')[0]),
            user
        }

        collections.push(collection)
    }

    return collections
}
