const expect = require('chai').expect
const config = require('../lib/config')

describe('config', function() {
  it('config.headers', function() {
    expect(config.headers).to.have.property('User-Agent')
      .which.is.a('string')

    expect(config.headers).to.have.property('Cookie')
      .which.is.a('string')
  })

  it('config.userAgent', function() {
    var userAgent = 'this is user agent'
    expect(config.userAgent).to.equal(config.headers['User-Agent'])
    config.userAgent = userAgent
    expect(config.headers['User-Agent']).to.equal(userAgent)
  })

  it('config.cookie', function() {
    var cookie = 'this is cookie'
    expect(config.cookie).to.equal(config.headers['Cookie'])
    config.cookie = cookie
    expect(config.headers['Cookie']).to.equal(cookie)
  })

  it('config.xsrf', function() {
    var xsrf = 'this is xsrf'
    config.xsrf = xsrf
    expect(config.xsrf).to.equal(xsrf)
    config.cookie = 'new cookie'
    expect(config.xsrf).to.equal('')
  })
})
