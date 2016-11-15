const api = require('..')
const expect = require('chai').expect

describe('api', function() {
  it('#_request', function() {
    expect(api._request).to.be.an('object')
  })

  it('#user', function() {
    expect(api.user).to.be.a('function')
    expect(api.user.prototype.__proto__).to.be.equal(api._request)
  })

  it('#org', function() {
    expect(api.org).to.be.a('function')
    expect(api.org.prototype.__proto__).to.be.equal(api._request)
  })

  it('#topic', function() {
    expect(api.topic).to.be.a('function')
    expect(api.topic.prototype.__proto__).to.be.equal(api._request)
  })

  it('#question', function() {
    expect(api.question).to.be.a('function')
    expect(api.question.prototype.__proto__).to.be.equal(api._request)
  })

  it('#answer', function() {
    expect(api.answer).to.be.a('function')
    expect(api.answer.prototype.__proto__).to.be.equal(api._request)
  })

  it('#version', function() {
    expect(api.version).to.be.a('string')
  })
})
