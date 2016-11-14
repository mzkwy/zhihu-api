const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getData = util.getData
const getText = util.getText
const toNum = util.toNum

module.exports = {
  parseAnswerVoters,
  parseAnswerComments,
  parseAnswerExplore
}

function parseAnswerVoters(htmls) {
  return util.map(htmls, html => {
    var $ = cheerio.load(html)
    var hashEle = $('.zm-rich-follow-btn')
    var linkEle = $('.zm-item-link-avatar')
    var link = getAttr(linkEle, 'href')
    var avatarEle = $('.zm-item-img-avatar')

    return {
      name: getAttr(linkEle, 'title'),
      slug: link.substring('/people/'.length),
      link: urls.full(link),
      hash: getData(hashEle, 'id'),
      avatar: getAttr(avatarEle, 'src')
    }
  })
}

function parseAnswerComments(obj) {
  var comments = obj.data.map(item => {
    var author = item.author
    var avatar = author.avatar
    avatar = avatar.template.replace('{id}', avatar.id).replace('{size}', 'l')

    return {
      id: item.id,
      content: item.content,
      link: urls.full(item.href),
      author: {
        name: author.name,
        slug: author.slug,
        link: author.url,
        avatar: avatar,
        meta: author.meta
      },
      createdtime: new Date(item.createdTime).getTime(),
      replyto: item.inReplyToCommentId,
      agrees: item.likesCount,
      crawltime: Date.now()
    }
  })

  return {
    comments,
    paging: obj.paging
  }
}

function parseAnswerExplore(html) {
  var $ = cheerio.load(html)
  var eles = $('.feed-item')

  return util.map(eles, ele => _parseExplore($, $(ele)))
}

function _parseExplore($, ele) {
  var quesEle = $('.question_link', ele)
  var quesLink = getAttr(quesEle, 'href')
  var link = quesLink
  quesLink = quesLink.substring(0, quesLink.indexOf('/answer'))
  var itemEle = $('.zm-item-answer', ele)
  var agreesEle = $('.zm-item-vote-info', itemEle)
  var authorEle = $('.zm-item-answer-author-info .author-link', itemEle)
  var authorLink = getAttr(authorEle, 'href')
  var answerEle = $('.zm-item-rich-text', itemEle)
  var contentEle = $('textarea', answerEle)
  var commentEle = $('.zm-item-meta .toggle-comment')

  return {
    id: getData(itemEle, 'atoken'),
    aid: getData(itemEle, 'aid'),
    resourceid: getData(answerEle, 'resourceid'),
    link: urls.full(link),
    createdtime: getData(itemEle, 'created') * 1000,
    agrees: getData(agreesEle, 'votecount'),
    comments: toNum(getText(commentEle).split(' ')[0]),
    content: getText(contentEle),
    author: {
      name: getText(authorEle),
      slug: authorLink.substring('/people/'.length),
      link: urls.full(authorLink)
    },
    question: {
      id: toNum(quesLink.substring('/question/'.length)),
      link: urls.full(quesLink),
      title: getText(quesEle)
    },
    crawltime: Date.now()
  }
}
