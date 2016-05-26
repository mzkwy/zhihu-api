const request = require('./global/api')._request
const expect = require('./global/expect')

describe('request', function() {
  this.timeout(15000)

  it('request(url)', function() {
    var req = request('https://httpbin.org/get?param=test')
    expect(req).to.be.a('promise')
    return expect(req).to.eventually.be.ok
  })

  it('request(url, data)', function() {
    var data = {
      param: 'test'
    }
    var req = request('https://httpbin.org/post', data)
    expect(req).to.be.a('promise')
    return expect(req).to.eventually.be.ok
  })

  it('request.xsrf()', function() {
    var xsrf = request.xsrf()
    expect(xsrf).to.be.a('promise')
    return expect(xsrf).to.eventually.be.a('string')
      .which.has.lengthOf(32)
  })
})
