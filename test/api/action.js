const action = require('../global/api').action
const expect = require('../global/expect')

var uname = 'ding_yao'
var answerId = 31433301
var topicId = 1525
var questionId = 338640

describe('api.action', function() {
  this.timeout(15000)

  it('action.follow(uname)', function() {
    var follow = action.follow(uname)
    expect(follow).to.be.a('promise')
    return expect(follow).to.eventually.be.an('object')
  })

  it('action.unfollow(uname)', function() {
    var unfollow = action.unfollow(uname)
    expect(unfollow).to.be.a('promise')
    return expect(unfollow).to.eventually.be.an('object')
  })

  it('action.followTopic(tid)', function() {
    var follow = action.followTopic(topicId)
    expect(follow).to.be.a('promise')
    return expect(follow).to.eventually.be.an('object')
  })

  it('action.unfollowTopic(tid)', function() {
    var unfollow = action.unfollowTopic(topicId)
    expect(unfollow).to.be.a('promise')
    return expect(unfollow).to.eventually.be.an('object')
  })

  it('action.followQuestion(qid)', function() {
    var follow = action.followQuestion(questionId)
    expect(follow).to.be.a('promise')
    return expect(follow).to.eventually.be.an('object')
  })

  it('action.unfollowQuestion(qid)', function() {
    var unfollow = action.unfollowQuestion(questionId)
    expect(unfollow).to.be.a('promise')
    return expect(unfollow).to.eventually.be.an('object')
  })

  it('action.voteUp(aid)', function() {
    var vote = action.voteUp(answerId)
    expect(vote).to.be.a('promise')
    return expect(vote).to.eventually.be.an('object')
  })

  it('action.voteDown(aid)', function() {
    var vote = action.voteDown(answerId)
    expect(vote).to.be.a('promise')
    return expect(vote).to.eventually.be.an('object')
  })

  it('action.voteNeutral(aid)', function() {
    var vote = action.voteNeutral(answerId)
    expect(vote).to.be.a('promise')
    return expect(vote).to.eventually.be.an('object')
  })

  it('api.action.sendMessage(uname)', function() {
    var msg = action.sendMessage(uname, 'hello')
    expect(msg).to.be.a('promise')
    return expect(msg).to.eventually.be.an('object')
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
