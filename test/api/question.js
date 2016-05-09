const question = require('../global/api').question
const expect = require('../global/expect')

var qid = 29568027

describe('api.question', function() {
    this.timeout(15000)

    it('Question(id)', function() {
        var ques = question(qid)
        expect(ques).to.have.property('_question')
        expect(ques._question).to.have.property('id')
        expect(ques._question.id).to.equal(qid)
    })

    it('question.answersByVote([offset])', function() {
        var answers = question(qid).answersByVote()
        expect(answers).to.be.a('promise')
        return expect(answers).to.eventually.be.an('array')
    })

    it('question.answersByPage([page])', function() {
        var answers = question(qid).answersByPage(1)
        expect(answers).to.be.a('promise')
        return expect(answers).to.eventually.be.an('array')
    })

    it('question.detail()', function() {
        var detail = question(qid).detail()
        expect(detail).to.be.a('promise')
        return expect(detail).to.eventually.be.an('object')
    })

    it('question.followers([offset])', function() {
        var followers = question(qid).followers()
        expect(followers).to.be.a('promise')
        return expect(followers).to.eventually.be.an('array')
    })
})
