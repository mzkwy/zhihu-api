const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum
const parseSlug = util.parseSlug

exports.parseOrgDetail = function(html) {
  var $ = cheerio.load(html)
  var profileMainEle = $('div.zm-profile-header-main')
  var profileInfoEle = $('div.zm-profile-header-info')
  var profileOpeEle = $('div.zm-profile-header-operation')
  var profileNavEle = $('div.profile-navbar')
  var followEle = $('div.zm-profile-side-following')

  var nameEle = $('.name', profileMainEle)
  var link = getAttr(nameEle, 'href')
  var bioEle = $('.bio', profileMainEle)
  var avatarEle = $('img.Avatar', profileMainEle)

  var itemEles = $('.zm-profile-header-user-describe .item', profileInfoEle)
  var descEle = $('#profile-header-description-input')

  var agreesEle = $('.zm-profile-header-user-agree > strong', profileOpeEle)
  var thanksEle = $('.zm-profile-header-user-thanks > strong', profileOpeEle)
  var hashEle = $('button.zm-rich-follow-btn', profileOpeEle)

  var navEles = $('.item', profileNavEle)
  var followeeEle = $('.item:first-child > strong', followEle)
  var followerEle = $('.item:last-child > strong', followEle)

  var profile = {
    name: getText(nameEle),
    biology: getAttr(bioEle, 'title'),
    avatar: getAttr(avatarEle, 'src'),
    industry: getText($('span', itemEles[0])),
    company: getText($('span', itemEles[1])),
    homepage: getAttr($('a', itemEles[2]), 'href'),
    description: getText(descEle),
    hash: getData(hashEle, 'id'),
    agrees: toNum(getText(agreesEle)),
    thanks: toNum(getText(thanksEle)),
    asks: toNum(getText($('.num', navEles[1]))),
    answers: toNum(getText($('.num', navEles[2]))),
    posts: toNum(getText($('.num', navEles[3]))),
    followees: toNum(getText(followeeEle)),
    followers: toNum(getText(followerEle)),
    crawltime: Date.now()
  }
  profile = Object.assign({}, parseSlug(link), profile)

  return profile
}
