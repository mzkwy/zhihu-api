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
  parseUserActivities,
  parseUserQuestions,
  parseUserAnswers,
  parseUserPosts,
  parseUserCollections,
  parseUserTopics,
  parseUserColumns
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

  var statusEle = $('.zh-profile-account-status')

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
    status: getText(statusEle),
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
  var genderEle = $('i.icon-profile-male', upperEle)
  if (!genderEle.length) {
    genderEle = $('i.icon-profile-female', upperEle)
  }
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
    var avatarEle = $('.zm-item-img-avatar')
    var link = getAttr(linkEle, 'href')

    var profile = {
      name: getAttr(linkEle, 'title'),
      uname: link.substring('/people/'.length),
      link: urls.full(link),
      hash: getData(hashEle, 'id'),
      avatar: getAttr(avatarEle, 'src')
    }

    return profile
  })

  return follows
}

function parseUserActivities(html) {
  var $ = cheerio.load(html)
  var eles = $('.zm-profile-section-item')

  return util.map(eles, ele => _parseUserActivity($, $(ele)))
}

function _parseUserActivity($, ele) {
  var time = getData(ele, 'time') * 1000
  var type = getData(ele, 'type-detail')

  var activity = {
    time,
    type
  }

  switch (type) {
    case 'member_voteup_answer':
    case 'member_answer_question':
      activity.answer = getAnswer()
      break
    case 'member_follow_question':
    case 'member_ask_question':
      activity.question = getQuestion()
      break
    case 'member_follow_topic':
      activity.topic = getTopic()
      break
    case 'member_voteup_article':
    case 'member_create_article':
      activity.post = getPost()
      break
    case 'member_follow_column':
      activity.column = getColumn()
      break
    case 'member_follow_favlist':
      activity.collection = getCollection()
      break
    case 'member_follow_roundtable':
      activity.roundtable = getRoundTable()
      break
    default:
      break
  }

  activity.crawltime = Date.now()

  return activity

  function getAnswer() {
    var answer = _parseUserAnswer($, ele)
    delete answer.crawltime
    return answer
  }

  function getQuestion() {
    var quesEle = $('.question_link', ele)
    var link = getAttr(quesEle, 'href')
    var title = getText(quesEle)

    return {
      id: toNum(link.substring('/question/'.length)),
      link: urls.full(link),
      title
    }
  }

  function getTopic() {
    var topicEle = $('.topic-link', ele)
    var link = getAttr(topicEle, 'href')
    var name = getAttr(topicEle, 'title')

    return {
      id: toNum(link.substring('/topic/'.length)),
      link: urls.full(link),
      name
    }
  }

  function getPost() {
    var post = _parseUserPost($, ele)
    delete post.crawltime
    return post
  }

  function getColumn() {
    var columnEle = $('.column_link', ele)
    var link = getAttr(columnEle, 'href')
    var name = getText(columnEle)

    return {
      uname: link.substring(link.lastIndexOf('/') + 1),
      name,
      link
    }
  }

  function getCollection() {
    var collectionEle = $('a:last-child', ele)
    var link = getAttr(collectionEle, 'href')
    var name = getText(collectionEle)

    return {
      id: toNum(link.substring(link.lastIndexOf('/') + 1)),
      name,
      link
    }
  }

  function getRoundTable() {
    var rtEle = $('.roundtable_link', ele)
    var link = getAttr(rtEle, 'href')
    var name = getText(rtEle)

    return {
      name,
      uname: /\/roundtable\/(\w+)/.exec(link)[1],
      link: urls.full(link)
    }
  }
}

function parseUserQuestions(html) {
  var $ = cheerio.load(html)
  var eles = $('#zh-profile-ask-list .zm-profile-section-item')

  return util.map(eles, ele => _parseUserQuestion($, $(ele)))
}

function _parseUserQuestion($, ele) {
  var viewsEle = $('.zm-profile-vote-count .zm-profile-vote-num', ele)
  var questionEle = $('.zm-profile-section-main .question_link', ele)
  var link = getAttr(questionEle, 'href')
  var metaEle = $('.zm-profile-section-main .meta', ele)
  var meta = getText(metaEle).split('•')
  var followEle = $('.zg-follow', metaEle)

  var question = {
    id: toNum(link.substring('/question/'.length)),
    qid: toNum(getAttr(followEle, 'id').substring('sfb-'.length)),
    link: urls.full(link),
    title: getText(questionEle),
    views: getText(viewsEle),
    answers: toNum(meta[1].trim().split(' ')[0]),
    follows: toNum(meta[2].trim().split(' ')[0])
  }

  return question
}

function parseUserAnswers(html) {
  var $ = cheerio.load(html)
  var eles = $('#zh-profile-answer-list .zm-item')

  return util.map(eles, ele => _parseUserAnswer($, $(ele)))
}

function _parseUserAnswer($, ele) {
  var questionEle = $('.question_link', ele)
  var questionLink = getAttr(questionEle, 'href')
  questionLink = questionLink.substring(0, questionLink.indexOf('/answer'))
  var answerEle = $('.zm-item-answer', ele)
  var agreesEle = $('.zm-item-vote-info', answerEle)
  var authorEle = $('.zm-item-answer-author-info .author-link', answerEle)
  var authorLink = getAttr(authorEle, 'href')
  var entryEle = $('.zm-item-rich-text', answerEle)
  var contentEle = $('textarea', entryEle)
  var commentsEle = $('.zm-item-meta .toggle-comment', answerEle)

  var answer = {
    id: getData(answerEle, 'atoken'),
    aid: getData(answerEle, 'aid'),
    resourceid: getData(entryEle, 'resourceid'),
    link: urls.full(getData(entryEle, 'entry-url')),
    createdtime: getData(answerEle, 'created') * 1000,
    agrees: getData(agreesEle, 'votecount'),
    comments: toNum(getText(commentsEle).split(' ')[0]),
    content: getText(contentEle),
    author: {
      name: getText(authorEle),
      uname: authorLink.substring('/people/'.length),
      link: urls.full(authorLink)
    },
    question: {
      id: toNum(questionLink.substring('/question/'.length)),
      title: getText(questionEle),
      link: urls.full(questionLink)
    },
    crawltime: Date.now()
  }

  return answer
}

function parseUserPosts(html) {
  var $ = cheerio.load(html)
  var eles = $('#zh-profile-post-list .zm-item')

  return util.map(eles, ele => _parseUserPost($, $(ele)))
}

function _parseUserPost($, ele) {
  var titleEle = $('.post-link', ele)
  var pidEle = $('meta[itemprop="post-id"]', ele)
  var idEle = $('meta[itemprop="post-url-token"]', ele)
  var agreesEle = $('.zm-item-vote-info', ele)
  var textEle = $('.entry-body textarea', ele)
  var commentsEle = $('.zm-item-meta .toggle-comment', ele)

  var post = {
    id: toNum(getAttr(idEle, 'content')),
    pid: toNum(getAttr(pidEle, 'content')),
    title: getText(titleEle),
    link: getAttr(titleEle, 'href'),
    agrees: getData(agreesEle, 'votecount'),
    comments: toNum(getText(commentsEle).split(' ')[0]),
    content: getText(textEle),
    crawltime: Date.now()
  }

  return post
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

function parseUserTopics(html) {
  var $ = cheerio.load(html)
  var eles = $('.zm-profile-section-item')

  return util.map(eles, ele => _parseUserTopic($, $(ele)))
}

function _parseUserTopic($, ele) {
  var linkEle = $('.zm-list-avatar-link', ele)
  var avatarEle = $('.zm-list-avatar-medium', ele)
  var nameEle = $('.zm-profile-section-main strong', ele)
  var link = getAttr(linkEle, 'href')

  var topic = {
    id: toNum(link.substring('/topic/'.length)),
    tid: toNum(getAttr(ele, 'id').substring('tpi-'.length)),
    link: urls.full(link),
    avatar: getAttr(avatarEle, 'src'),
    name: getText(nameEle)
  }

  return topic
}

function parseUserColumns(htmls) {
  var columns = htmls.map(html => {
    var $ = cheerio.load(html)
    var linkEle = $('.zm-list-avatar-link')
    var avatarEle = $('.zm-list-avatar-medium')
    var nameEle = $('.zm-profile-section-main strong')
    var descEle = $('.zm-profile-section-main .description')
    var metaEle = $('.zm-profile-section-main .meta span')
    var link = getAttr(linkEle, 'href')

    var column = {
      link: link,
      uname: link.substring(link.lastIndexOf('/') + 1),
      avatar: getAttr(avatarEle, 'src'),
      name: getText(nameEle),
      description: getText(descEle),
      posts: toNum(getText(metaEle).split(' ')[0]) || 0
    }

    return column
  })

  return columns
}
