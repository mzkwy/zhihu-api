const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum

module.exports = {
    parseQuestionAnswersByVote,
    parseQuestionAnswersByPage,
    parseQuestionDetail,
    parseQuestionFollowers
}

function parseQuestionAnswersByVote(htmls) {
    return util.map(htmls, html => {
        var $ = cheerio.load(html)
        var ele = $('.zm-item-answer')
        return _parseQuestionAnswer($, ele)
    })
}

function parseQuestionAnswersByPage(html) {
    var $ = cheerio.load(html)
    var eles = $('#zh-question-answer-wrap .zm-item-answer')

    return util.map(eles, ele => _parseQuestionAnswer($, $(ele)))
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
        aid: getData(ele, 'aid'),
        createdtime: getData(ele, 'created') * 1000,
        agrees: getData(agreesEle, 'votecount'),
        author: {
            name: getText(authorEle),
            uname: authorLink.substring('/people/'.length),
            link: urls.full(authorLink)
        },
        resourceid: getData(contentEle, 'resourceid'),
        link: urls.full(getData(contentEle, 'entry-url')),
        comments: toNum(getText(commentEle).split(' ')[0]),
        content: getText(answerEle).trim(),
        crawltime: Date.now()
    }

    return answer
}

function parseQuestionDetail(html) {
    var $ = cheerio.load(html)
    var mainEle = $('.zu-main-content-inner')
    var visitsEle = $('meta[itemprop="visitsCount"]', mainEle)
    var topicsEle = $('.zm-tag-editor-labels .zm-item-tag', mainEle)
    var titleEle = $('#zh-question-title .zm-item-title', mainEle)
    var detailEle = $('#zh-question-detail .zm-editable-content', mainEle)
    if (!detailEle.length) {
        detailEle = $('#zh-question-detail textarea', mainEle)
        var $$ = cheerio.load('<div id="custom-wrapper">' + detailEle.text() + '</div>')
        detailEle = $$('#custom-wrapper')
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
        title: getText(titleEle).trim(),
        detail: getText(detailEle),
        answers: getData(answersEle, 'num'),
        comments: toNum(getText(commentsEle).split(' ')[0]),
        followers: toNum(getText(followEle)),
        visits: toNum(getAttr(visitsEle, 'content')),
        topics: util.map(topicsEle, ele => _parseQuestionTopic($(ele))),
        crawltime: Date.now()
    }

    return question

    function _parseQuestionTopic(ele) {
        var link = getAttr(ele, 'href')

        return {
            id: toNum(link.substring('/topic/'.length)),
            link: urls.full(link),
            name: getText(ele).trim()
        }
    }
}

function parseQuestionFollowers(html) {
    var $ = cheerio.load(html)
    var eles = $('.zm-profile-card')

    return util.map(eles, ele => _parseQuestionFollower($, $(ele)))
}

function _parseQuestionFollower($, ele) {
    var hashEle = $('.zg-btn-follow', ele)
    var linkEle = $('.zm-item-link-avatar', ele)
    var link = getAttr(linkEle, 'href')
    var avatarEle = $('.zm-item-img-avatar', ele)

    var follower = {
        name: getAttr(linkEle, 'title'),
        uname: link.substring('/poeple/'.length),
        link: urls.full(link),
        hash: getData(hashEle, 'id'),
        avatar: getAttr(avatarEle, 'src')
    }

    return follower
}
