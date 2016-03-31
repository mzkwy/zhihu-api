const question = require('./question')
const topic = require('./topic')
const user = require('./user')

var parser = Object.create(null)
Object.assign(parser, question, topic, user)

module.exports = parser
