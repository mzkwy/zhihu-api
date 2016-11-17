const cheerio = require('cheerio')
const util = require('./util')
const urls = require('../urls')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum
const parseSlug = util.parseSlug

module.exports = {
  parseTopicHierarchy,
  parseTopicFollowers,
  parseTopicAnswers,
  parseTopicQuestions
}

function parseTopicHierarchy (html) {
  var $ = cheerio.load(html)
  var linkEle = $('.topic-avatar .zm-entry-head-avatar-link')
  var link = getAttr(linkEle, 'href')
  var avatarEle = $('img', linkEle)
  var parentEles = $('#zh-topic-organize-parent-editor .zm-item-tag')
  var childEles = $('#zh-topic-organize-child-editor .zm-item-tag')
  var sidebarEle = $('#zh-topic-side-head')
  var focusEle = $('.zu-entry-focus-button', sidebarEle)
  var followerEle = $('.zm-topic-side-followers-info strong', sidebarEle)

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

function _parseHierarchyLabels ($, eles) {
  return util.map(eles, ele => parseLabel($, $(ele)))

  function parseLabel ($, ele) {
    var link = getAttr(ele, 'href').replace('/organize', '')
    var topic = {
      id: getData(ele, 'token'),
      tid: getData(ele, 'topicid'),
      name: getText(ele).trim(),
      link: urls.full(link)
    }
    return topic
  }
}

function parseTopicFollowers (html) {
  var $ = cheerio.load(html)
  var eles = $('.zm-person-item')

  return util.map(eles, ele => _parseTopicFollower($, $(ele)))
}

function _parseTopicFollower ($, ele) {
  var followEle = $('.zg-btn', ele)
  var avatarEle = $('.zm-list-avatar-medium img', ele)
  var nameEle = $('.zm-list-content-title a', ele)
  var link = getAttr(nameEle, 'href')

  var follower = Object.assign(parseSlug(link), {
    name: getText(nameEle),
    avatar: getAttr(avatarEle, 'src'),
    hash: getAttr(followEle, 'id').substring('pp-'.length),
    followtime: toNum(getAttr(ele, 'id').substring('mi-'.length)) * 1000
  })

  return follower
}

function parseTopicAnswers (html) {
  var $ = cheerio.load(html)
  var eles = $('.feed-item')

  return util.map(eles, ele => _parseTopicAnswer($, $(ele)))
}

function _parseTopicAnswer ($, ele) {
  var aidEle = $('meta[itemprop="answer-id"]')
  var quesEle = $('.question_link', ele)
  var quesLink = getAttr(quesEle, 'href')
  var entryEle = $('.entry-body', ele)
  var agreesEle = $('.zm-item-vote-info', entryEle)
  var authorEle = $('.zm-item-answer-author-info .author-link', entryEle)
  var authorLink = getAttr(authorEle, 'href')
  var answerEle = $('.zm-item-rich-text', entryEle)
  var answerLink = getData(answerEle, 'entry-url')
  var contentEle = $('textarea', answerEle)
  var commentsEle = $('.zm-item-meta .toggle-comment')

  var answer = {
    id: toNum(answerLink.substring(answerLink.lastIndexOf('/') + 1)),
    aid: toNum(getAttr(aidEle, 'content')),
    resourceid: getData(answerEle, 'resourceid'),
    link: urls.full(answerLink),
    agrees: getData(agreesEle, 'votecount'),
    comments: toNum(getText(commentsEle).split(' ')[0]),
    content: getText(contentEle),
    author: {
      name: getText(authorEle)
    },
    question: {
      id: toNum(quesLink.substring('/question/'.length)),
      link: urls.full(quesLink),
      title: getText(quesEle)
    },
    score: getData(ele, 'score'),
    crawltime: Date.now()
  }
  Object.assign(answer.author, parseSlug(authorLink))

  return answer
}

function parseTopicQuestions (html) {
  var $ = cheerio.load(html)
  var eles = $('.feed-item')

  return util.map(eles, ele => _parseTopicQuestion($, $(ele)))
}

function _parseTopicQuestion ($, ele) {
  var linkEle = $('.question_link', ele)
  var link = getAttr(linkEle, 'href')
  var answersEle = $('meta[itemprop="answerCount"]', ele)
  var followersEle = $('.question-item-meta .meta-item:nth-child(3)', ele)
  var qidEle = $('.js-questionUnhelpful', ele)

  var question = {
    id: toNum(link.substring('/question/'.length)),
    qid: getData(qidEle, 'qid'),
    link: urls.full(link),
    title: getText(linkEle),
    answers: toNum(getAttr(answersEle, 'count')),
    followers: toNum(getText(followersEle).split(' ')[0]),
    crawltime: Date.now()
  }

  return question
}
