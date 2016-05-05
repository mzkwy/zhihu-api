const answer = require('../global/api').answer
const expect = require('../global/expect')

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
