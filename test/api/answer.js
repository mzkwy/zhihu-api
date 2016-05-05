const fs = require('fs')
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const config = require('../../lib/config')
const answer = require('../../lib/api/answer')

var cookiePath = path.join(__dirname, '../../cookie')
config.setCookie(fs.readFileSync(cookiePath))

chai.use(chaiAsPromised)
const expect = chai.expect

var aid = 32208485

describe('api.answer', function() {
    this.timeout(15000)

    it('api.answer(aid)', function() {
        var ans = answer(aid)
        expect(ans).to.have.property('_answer')
        expect(ans._answer).to.have.property('aid')
        expect(ans._answer.aid).to.equal(aid)
    })

    it('#answer.voters()', function() {
        var voters = answer(aid).voters()
        expect(voters).to.be.a('promise')
        return expect(voters).to.eventually.be.an('object')
    })
})
