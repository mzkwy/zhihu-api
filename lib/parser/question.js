const cheerio = require('cheerio')
const util = require('./util')

const getAttr = util.getAttr
const getText = util.getText

module.exports = {
    parseQuestions
}

function parseQuestions(html) {
    var $ = cheerio.load(html)
    var items = $('div.zm-item')

    var questions = []

    for (var i = 0; i < items.length; i++) {
        var item = $(items[i])
        var titleEle = $('.zm-item-title a', item)
        var authorEle = $('h2 + div > a', item)
        var timeEle = $('div.zm-item-meta time', item)

        var question = {
            logid: getAttr(item, 'id').replace('logitem-', ''),
            title: getText(titleEle),
            link: getAttr(titleEle, 'href'),
            author: {
                name: getText(authorEle),
                link: getAttr(authorEle, 'href')
            },
            time: +new Date(getText(timeEle)),
            crawltime: Date.now()
        }
        question.id = question.link.replace('/question/', '')

        questions.push(question)
    }

    return questions
}
