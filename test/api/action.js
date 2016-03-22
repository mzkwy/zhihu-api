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

describe('api.action', function() {
    this.timeout(10000)

    it('api.action.follow(uname)', function() {
        var follow = action.follow('ding_yao')
        expect(follow).to.be.a('promise')
        return expect(follow).to.eventually.be.an('object')
    })

    it('api.action.unfollow(uname)', function() {
        var unfollow = action.unfollow('ding_yao')
        expect(unfollow).to.be.a('promise')
        return expect(unfollow).to.eventually.be.an('object')
    })

    it('api.action.sendMessage(uname)', function() {
        var msg = action.sendMessage('ding_yao', 'hello')
        expect(msg).to.be.a('promise')
        return expect(msg).to.eventually.be.an('object')
    })
})
