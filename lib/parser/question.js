const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const getHtml = util.getHtml
const toNum = util.toNum
const parseSlug = util.parseSlug

module.exports = {
  /**
   * Answers by voteup weights.
   */
  answersByVote(htmls) {
    return util.map(htmls, html => {
      var $ = cheerio.load(html, {
        decodeEntities: false
      })
      var ele = $('.zm-item-answer')
      return _parseQuestionAnswer($, ele)
    })
  },

  /**
   * Answers by page.
   */
  answersByPage($) {
    $ = cheerio.load($.html({
      decodeEntities: false
    }), {
      decodeEntities: false
    })
    var eles = $('#zh-question-answer-wrap .zm-item-answer')

    return util.map(eles, ele => _parseQuestionAnswer($, $(ele)))
  },

  /**
   * Question detail.
   */
  detail($) {
    var mainEle = $('.zu-main-content-inner')
    var visitsEle = $('meta[itemprop="visitsCount"]', mainEle)
    var topicsEle = $('.zm-tag-editor-labels .zm-item-tag', mainEle)
    var titleEle = $('#zh-question-title .zm-item-title', mainEle)
    var detailEle = $('#zh-question-detail .zm-editable-content', mainEle)
    if (!detailEle.length) {
      detailEle = $('#zh-question-detail textarea', mainEle)
    }
    var commentsEle = $('#zh-question-meta-wrap .toggle-comment', mainEle)
    var answersEle = $('#zh-question-answer-num', mainEle)
    var sidebarEle = $('.zu-main-sidebar')
    var followBtnEle = $('.follow-button', sidebarEle)
    var followEle = $('.zh-question-followers-sidebar .zg-gray-normal a', sidebarEle)
    var link = getAttr(followEle, 'href').replace('/followers', '')

    var question = {
      id: toNum(link.substring('/question/'.length)),
      qid: getData(followBtnEle, 'id'),
      type: 'question',
      title: getText(titleEle).trim(),
      content: getText(detailEle),
      answer_count: getData(answersEle, 'num'),
      comment_count: toNum(getText(commentsEle).split(' ')[0]),
      follower_count: toNum(getText(followEle)),
      visit_count: toNum(getAttr(visitsEle, 'content')),
      topics: util.map(topicsEle, ele => _parseQuestionTopic($(ele)))
    }

    return question
  },

  /**
   * Followers.
   */
  followers(html) {
    var $ = cheerio.load(html)
    var eles = $('.zm-profile-card')

    return util.map(eles, ele => _parseQuestionFollower($, $(ele)))
  }
}

function _parseQuestionAnswer($, ele) {
  var authorEle = $('.zm-item-answer-author-info .author-link', ele)
  var authorLink = getAttr(authorEle, 'href')
  var agreesEle = $('.zm-item-vote-info', ele)
  var contentEle = $('.zm-item-rich-text', ele)
  var answerEle = $('.zm-editable-content', contentEle)
  var commentEle = $('.meta-item.toggle-comment', ele)

  var answer = {
    id: getData(ele, 'atoken'),
    type: 'answer',
    aid: getData(ele, 'aid'),
    resourceid: getData(contentEle, 'resourceid'),
    url: urls.full(getData(contentEle, 'entry-url')),
    voteup_count: getData(agreesEle, 'votecount'),
    comment_count: toNum(getText(commentEle).split(' ')[0]),
    content: getHtml(answerEle).trim(),
    created_time: getData(ele, 'created'),
    author: {
      name: getText(authorEle)
    }
  }
  Object.assign(answer.author, parseSlug(authorLink))

  return answer
}

function _parseQuestionTopic(ele) {
  var link = getAttr(ele, 'href')

  return {
    id: toNum(link.substring('/topic/'.length)),
    type: 'topic',
    name: getText(ele).trim()
  }
}

function _parseQuestionFollower($, ele) {
  var hashEle = $('.zm-rich-follow-btn', ele)
  var linkEle = $('.zm-item-link-avatar', ele)
  var link = getAttr(linkEle, 'href')

  var follower = Object.assign({
    id: getData(hashEle, 'id'),
    name: getAttr(linkEle, 'title')
  }, parseSlug(link))

  return follower
}
