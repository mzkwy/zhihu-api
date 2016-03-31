const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum

module.exports = {
    parseQuestions,
    parseQuestionAnswersByVote,
    parseQuestionAnswersByPage
}

function parseQuestions(html) {
    var $ = cheerio.load(html)
    var eles = $('.zm-item')

    return util.map(eles, ele => _parseQuestion($, $(ele)))
}

function _parseQuestion($, ele) {
    var titleEle = $('.zm-item-title a', ele)
    var titleLink = getAttr(titleEle, 'href')
    var authorEle = $('h2 + div > a', ele)
    var authorLink = getAttr(authorEle, 'href')
    var contentEle = $('.zg-item-log-detail', ele)
    var timeEle = $('.zm-item-meta time', ele)

    var question = {
        id: toNum(titleLink.substring('/question/'.length)),
        logid: toNum(getAttr(ele, 'id').substring('logitem-'.length)),
        title: getText(titleEle),
        link: urls.full(titleLink),
        author: {
            name: getText(authorEle),
            uname: authorLink.substring('/people/'.length),
            link: urls.full(authorLink)
        },
        content: getText(contentEle).trim(),
        time: +new Date(getText(timeEle)),
        crawltime: Date.now()
    }

    return question
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
