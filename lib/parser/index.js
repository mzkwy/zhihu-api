const account = require('./account')
const answer = require('./answer')
const org = require('./org')
const question = require('./question')
const topic = require('./topic')
const user = require('./user')

var parser = Object.create(null)
Object.assign(parser, account, answer, org, question, topic, user)

module.exports = parser
