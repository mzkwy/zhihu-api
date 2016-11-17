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

function parseUserDetail (html) {
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
  var statusEle = $('.zh-profile-account-status')

  var profile = {
    name: getText(nameEle),
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
    status: getText(statusEle),
    crawltime: Date.now()
  }
  profile = Object.assign({}, parseSlug(link), profile)

  // if you are blocked by this user
  // or it's yourself
  if (!profile.hash) {
    var currentEle = $('.json-inline[data-name="current_people"]')
    var info = JSON.parse(getText(currentEle))
    profile.hash = info[3]
  }

  return profile
}

function parseUserCollections (html) {
  var $ = cheerio.load(html)
  var eles = $('#zh-profile-fav-list .zm-profile-section-item')

  return util.map(eles, ele => _parseUserCollection($, $(ele)))
}

function _parseUserCollection ($, ele) {
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
