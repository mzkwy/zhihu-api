const cheerio = require('cheerio')
const urls = require('../urls')
const util = require('./util')

const getAttr = util.getAttr
const getData = util.getData

module.exports = {
    parseAnswerVoters,
    parseAnswerComments
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
            uname: link.substring('/people/'.length),
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
                uname: author.slug,
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
