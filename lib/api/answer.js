const cheerio = require('cheerio')
const request = require('../request')
const parser = require('../parser')
const urls = require('../config').urls

const getAttr = parser.getAttr
const getText = parser.getText
const getData = parser.getData
const toNum = parser.toNum

exports = module.exports = answer
exports.byVote = listAnswersByVote
exports.byPage = listAnswersByPage

function answer() {

}

function listAnswersByVote(questionId, offset) {
    var data = {
        method: 'next',
        params: JSON.stringify({
            url_token: questionId,
            pagesize: 20,
            offset: offset || 0
        })
    }
    return request.xsrf()
        .then(_xsrf => {
            data._xsrf = _xsrf
            return request(urls.answer.byVote, data)
        })
        .then(data => {
            data = JSON.parse(data)
            return data.msg
        })
        .then(_parseVoteAnswers)
}

function listAnswersByPage(questionId, page) {
    var url = urls.answer.byPage(questionId, page)

    return request(url)
        .then(_parsePageAnswers)
        .catch(err => {
            var params = JSON.stringify({
                questionId,
                page
            })
            throw new Error('list answers: ' + params)
        })
}

function _parseVoteAnswers(htmls) {
    var answers = htmls.map(html => {
        var $ = cheerio.load(html)
        return _parseAnswer($, $('.zm-item-answer'))
    })

    return answers
}

function _parsePageAnswers(html) {
    var answers = []
    var $ = cheerio.load(html)
    var items = $('#zh-question-answer-wrap .zm-item-answer')

    for (var i = 0; i < items.length; i++) {
        var answer = _parseAnswer($, $(items[i]))
        answers.push(answer)
    }

    return answers
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
