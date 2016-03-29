const answer = require('./answer')
const collection = require('./collection')
const question = require('./question')
const topic = require('./topic')
const user = require('./user')

var parser = Object.create(null)

merge(parser, answer)
merge(parser, collection)
merge(parser, question)
merge(parser, topic)
merge(parser, user)

function merge(to, from) {
    Object.keys(from).forEach(key => {
        to[key] = from[key]
    })
}

module.exports = parser
