const cheerio = require('cheerio')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText
const getData = util.getData
const toNum = util.toNum

module.exports = {
    parseAnswersByVote,
    parseAnswersByPage,
    parseAnswer
}

function parseAnswersByVote(htmls) {
    return htmls.map(parseAnswer)
}

function parseAnswersByPage(html) {
    var answers = []
    var $ = cheerio.load(html)
    var items = $('#zh-question-answer-wrap .zm-item-answer')

    for (var i = 0; i < items.length; i++) {
        var answer = _parseAnswer($, $(items[i]))
        answers.push(answer)
    }

    return answers
}

function parseAnswer(html) {
    var $ = cheerio.load(html)
    var item = $('.zm-item-answer')
    return _parseAnswer($, item)
}

function _parseAnswer($, item) {
    var agreesEle = $('.zm-votebar .up .count', item)
    var authorEle = $('.zm-item-answer-author-info .author-link', item)
    var contentEle = $('> .zm-item-rich-text', item)
    var answerEle = $('.zm-editable-content', contentEle)

    var answer = {
        aid: getData(item, 'aid'),
        atoken: getData(item, 'atoken'),
        createdtime: toNum(getData(item, 'created')) * 1000,
        agrees: toNum(getText(agreesEle)),
        author: {
            name: getText(authorEle),
            link: getAttr(authorEle, 'href')
        },
        resourceid: getData(contentEle, 'resourceid'),
        link: getData(contentEle, 'entry-url'),
        content: getText(answerEle).trim()
    }

    return answer
}
