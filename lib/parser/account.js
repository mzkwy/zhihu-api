const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum
const parseSlug = util.parseSlug

module.exports = {
  parseAccountProfile,
  parseAccountFollows,
  parseAccountActivities,
  parseAccountQuestions,
  parseAccountAnswers,
  parseAccountPosts,
  parseAccountTopics,
  parseAccountColumns
}

function parseAccountProfile (html) {
  var $ = cheerio.load(html)
  var upperEle = $('.upper')
  var lowerEle = $('.lower')

  var linkEle = $('.avatar-link', upperEle)
  var link = getAttr(linkEle, 'href')
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

  var profile = {
    name: getText(nameEle),
    avatar: getAttr(avatarEle, 'src'),
    gender: getAttr(genderEle, 'class').substring('icon icon-profile-'.length),
    biology: getText(bioEle),
    answers: getText(answersEle),
    posts: getText(postsEle),
    followers: getText(followerEle),
    hash: getData(hashEle, 'id'),
    crawltime: Date.now()
  }
  profile = Object.assign({}, parseSlug(link), profile)

  if (profile.type === 'org') {
    delete profile.gender
  }

  return profile
}

function parseAccountFollows (htmls) {
  var follows = htmls.map(html => {
    var $ = cheerio.load(html)
    var hashEle = $('.zm-rich-follow-btn')
    var linkEle = $('.zm-item-link-avatar')
    var avatarEle = $('.zm-item-img-avatar')
    var link = getAttr(linkEle, 'href')

    var profile = Object.assign(parseSlug(link), {
      name: getAttr(linkEle, 'title'),
      hash: getData(hashEle, 'id'),
      avatar: getAttr(avatarEle, 'src')
    })

    return profile
  })

  return follows
}

function parseAccountActivities (html) {
  var $ = cheerio.load(html)
  var eles = $('.zm-profile-section-item')

  return util.map(eles, ele => _parseAccountActivity($, $(ele)))
}

function _parseAccountActivity ($, ele) {
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

  function getAnswer () {
    var answer = _parseAccountAnswer($, ele)
    delete answer.crawltime
    return answer
  }

  function getQuestion () {
    var quesEle = $('.question_link', ele)
    var link = getAttr(quesEle, 'href')
    var title = getText(quesEle)

    return {
      id: toNum(link.substring('/question/'.length)),
      link: urls.full(link),
      title
    }
  }

  function getTopic () {
    var topicEle = $('.topic-link', ele)
    var link = getAttr(topicEle, 'href')
    var name = getAttr(topicEle, 'title')

    return {
      id: toNum(link.substring('/topic/'.length)),
      link: urls.full(link),
      name
    }
  }

  function getPost () {
    var post = _parseAccountPost($, ele)
    delete post.crawltime
    return post
  }

  function getColumn () {
    var columnEle = $('.column_link', ele)
    var link = getAttr(columnEle, 'href')
    var name = getText(columnEle)

    return {
      slug: link.substring(link.lastIndexOf('/') + 1),
      name,
      link
    }
  }

  function getCollection () {
    var collectionEle = $('a:last-child', ele)
    var link = getAttr(collectionEle, 'href')
    var name = getText(collectionEle)

    return {
      id: toNum(link.substring(link.lastIndexOf('/') + 1)),
      name,
      link
    }
  }

  function getRoundTable () {
    var rtEle = $('.roundtable_link', ele)
    var link = getAttr(rtEle, 'href')
    var name = getText(rtEle)

    return {
      name,
      slug: /\/roundtable\/(\w+)/.exec(link)[1],
      link: urls.full(link)
    }
  }
}

function parseAccountQuestions (html) {
  var $ = cheerio.load(html)
  var eles = $('#zh-profile-ask-list .zm-profile-section-item')

  return util.map(eles, ele => _parseAccountQuestion($, $(ele)))
}

function _parseAccountQuestion ($, ele) {
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

function parseAccountAnswers (html) {
  var $ = cheerio.load(html)
  var eles = $('#zh-profile-answer-list .zm-item')

  return util.map(eles, ele => _parseAccountAnswer($, $(ele)))
}

function _parseAccountAnswer ($, ele) {
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
      name: getText(authorEle)
    },
    question: {
      id: toNum(questionLink.substring('/question/'.length)),
      title: getText(questionEle),
      link: urls.full(questionLink)
    },
    crawltime: Date.now()
  }
  Object.assign(answer.author, parseSlug(authorLink))

  return answer
}

function parseAccountPosts (html) {
  var $ = cheerio.load(html)
  var eles = $('#zh-profile-post-list .zm-item')

  return util.map(eles, ele => _parseAccountPost($, $(ele)))
}

function _parseAccountPost ($, ele) {
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

function parseAccountTopics (html) {
  var $ = cheerio.load(html)
  var eles = $('.zm-profile-section-item')

  return util.map(eles, ele => _parseAccountTopic($, $(ele)))
}

function _parseAccountTopic ($, ele) {
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

function parseAccountColumns (htmls) {
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
      slug: link.substring(link.lastIndexOf('/') + 1),
      avatar: getAttr(avatarEle, 'src'),
      name: getText(nameEle),
      description: getText(descEle),
      posts: toNum(getText(metaEle).split(' ')[0]) || 0
    }

    return column
  })

  return columns
}
