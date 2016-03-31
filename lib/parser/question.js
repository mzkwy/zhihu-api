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
    var items = $('.zm-item')

    return util.map(items, item => _parseQuestion($, $(item)))
}

function _parseQuestion($, item) {
    var titleEle = $('.zm-item-title a', item)
    var titleLink = getAttr(titleEle, 'href')
    var authorEle = $('h2 + div > a', item)
    var authorLink = getAttr(authorEle, 'href')
    var contentEle = $('.zg-item-log-detail', item)
    var timeEle = $('.zm-item-meta time', item)

    var question = {
        id: toNum(titleLink.substring('/question/'.length)),
        logid: toNum(getAttr(item, 'id').substring('logitem-'.length)),
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
        var item = $('.zm-item-answer')
        return _parseQuestionAnswer($, item)
    })
}

function parseQuestionAnswersByPage(html) {
    var $ = cheerio.load(html)
    var items = $('#zh-question-answer-wrap .zm-item-answer')

    return util.map(items, item => _parseQuestionAnswer($, $(item)))
}

function _parseQuestionAnswer($, item) {
    var authorEle = $('.zm-item-answer-author-info .author-link', item)
    var authorLink = getAttr(authorEle, 'href')
    var agreesEle = $('.zm-item-vote-info', item)
    var contentEle = $('.zm-item-rich-text', item)
    var answerEle = $('.zm-editable-content', contentEle)
    var commentEle = $('.meta-item.toggle-comment', item)

    var answer = {
        id: getData(item, 'atoken'),
        aid: getData(item, 'aid'),
        createdtime: getData(item, 'created') * 1000,
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
