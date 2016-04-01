const fs = require('fs')
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const config = require('../../lib/config')
const action = require('../../lib/api/action')

var cookiePath = path.join(__dirname, '../../cookie')
config.setCookie(fs.readFileSync(cookiePath))

chai.use(chaiAsPromised)
const expect = chai.expect

const uname = 'ding_yao'
const answerId = 31433301
const topicId = 1525

describe('api.action', function() {
    this.timeout(15000)

    it('api.action.follow(uname)', function() {
        var follow = action.follow(uname)
        expect(follow).to.be.a('promise')
        return expect(follow).to.eventually.be.an('object')
    })

    it('api.action.unfollow(uname)', function() {
        var unfollow = action.unfollow(uname)
        expect(unfollow).to.be.a('promise')
        return expect(unfollow).to.eventually.be.an('object')
    })

    it('api.action.sendMessage(uname)', function() {
        var msg = action.sendMessage(uname, 'hello')
        expect(msg).to.be.a('promise')
        return expect(msg).to.eventually.be.an('object')
    })

    it('api.action.voteDown(id)', function() {
        var vote = action.voteDown(answerId)
        expect(vote).to.be.a('promise')
        return expect(vote).to.eventually.be.an('object')
    })

    it('api.action.voteUp(id)', function() {
        var vote = action.voteUp(answerId)
        expect(vote).to.be.a('promise')
        return expect(vote).to.eventually.be.an('object')
    })

    it('api.action.followTopic(tid)', function() {
        var follow = action.followTopic(topicId)
        expect(follow).to.be.a('promise')
        return expect(follow).to.eventually.be.an('object')
    })

    it('api.action.unfollowTopic(tid)', function() {
        var unfollow = action.unfollowTopic(topicId)
        expect(unfollow).to.be.a('promise')
        return expect(unfollow).to.eventually.be.an('object')
    })

    it('api.action.block(uname)', function() {
        var block = action.block(uname)
        expect(block).to.be.a('promise')
        return expect(block).to.eventually.be.an('object')
    })

    it('api.action.unblock(uname)', function() {
        var unblock = action.unblock(uname)
        expect(unblock).to.be.a('promise')
        return expect(unblock).to.eventually.be.an('object')
    })
})
