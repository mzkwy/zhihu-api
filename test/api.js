/* eslint-env mocha */
const api = require('..')
const expect = require('chai').expect

describe('api', function () {
  it('#_request', function () {
    expect(api._request).to.be.an('object')
  })

  it('#user', function () {
    expect(api.user).to.be.a('function')
    expect(Object.getPrototypeOf(api.user.prototype)).to.be.equal(api._request)
  })

  it('#org', function () {
    expect(api.org).to.be.a('function')
    expect(Object.getPrototypeOf(api.org.prototype)).to.be.equal(api._request)
  })

  it('#topic', function () {
    expect(api.topic).to.be.a('function')
    expect(Object.getPrototypeOf(api.topic.prototype)).to.be.equal(api._request)
  })

  it('#question', function () {
    expect(api.question).to.be.a('function')
    expect(Object.getPrototypeOf(api.question.prototype)).to.be.equal(api._request)
  })

  it('#answer', function () {
    expect(api.answer).to.be.a('function')
    expect(Object.getPrototypeOf(api.answer.prototype)).to.be.equal(api._request)
  })

  it('#version', function () {
    expect(api.version).to.be.a('string')
  })
})
