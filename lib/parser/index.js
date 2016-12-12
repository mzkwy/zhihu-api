const answer = require('./answer')
const topic = require('./topic')
const user = require('./user')

var parser = Object.create(null)
Object.assign(parser, answer, topic)

module.exports = parser
