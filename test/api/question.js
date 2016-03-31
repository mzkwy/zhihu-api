const fs = require('fs')
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const config = require('../../lib/config')
const question = require('../../lib/api/question')

var cookiePath = path.join(__dirname, '../../cookie')
config.setCookie(fs.readFileSync(cookiePath))

chai.use(chaiAsPromised)
const expect = chai.expect

var qid = 29568027

describe('api.question', function() {
    this.timeout(15000)

    it('api.question(id)', function() {
        var ques = question(qid)
        expect(ques).to.have.property('_question')
        expect(ques._question).to.have.property('id')
        expect(ques._question.id).to.equal(qid)
    })

    it('api.question.latest()', function() {
        var list = question.latest()
        expect(list).to.be.a('promise')
        return expect(list).to.eventually.be.an('array')
    })

    it('api.question.list(start, offset)', function() {
        var list = question.latest(null, 0)
        expect(list).to.be.a('promise')
        return expect(list).to.eventually.be.an('array')
    })

    it('#question.answersByVote(offset)', function() {
        var answers = question(qid).answersByVote()
        expect(answers).to.be.a('promise')
        return expect(answers).to.eventually.be.an('array')
    })

    it('#question.answersByPage(page)', function() {
        var answers = question(qid).answersByPage(1)
        expect(answers).to.be.a('promise')
        return expect(answers).to.eventually.be.an('array')
    })
})
