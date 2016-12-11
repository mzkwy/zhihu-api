const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum
const parseSlug = util.parseSlug

module.exports = {
  parseUserDetail,
  parseUserCollections
}

function parseUserDetail($) {
  return $('#data').data('state')
}

function parseUserCollections(html) {
  var $ = cheerio.load(html)
  var eles = $('#zh-profile-fav-list .zm-profile-section-item')

  return util.map(eles, ele => _parseUserCollection($, $(ele)))
}

function _parseUserCollection($, ele) {
  var titleEle = $('.zm-profile-fav-item-title', ele)
  var metaEle = $('.zm-profile-fav-bio', ele)
  var followEle = $('.zg-btn-follow', ele)
  var link = getAttr(titleEle, 'href')
  var meta = getText(metaEle).trim().split('•')

  var collection = {
    name: getText(titleEle),
    id: toNum(link.substring('/collection/'.length)),
    fvid: toNum(getAttr(followEle, 'id').substring('/fv-/'.length)),
    link: urls.full(link),
    answers: toNum(meta[0].split(' ')[0]),
    followers: toNum(meta[1].split(' ')[0]),
    crawltime: Date.now()
  }

  return collection
}
