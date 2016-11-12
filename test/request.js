const Request = require('../lib/request')
const expect = require('chai').expect

describe('Request', function() {
  this.timeout(15000)
  var request = new Request()

  it('#get', function() {
    return request.get('https://httpbin.org/get')
      .json()
      .then(res => {
        expect(res).to.be.an('object')
      })
  })

  it('#post', function() {
    var data = {
      param: 'test'
    }

    return request.post('https://httpbin.org/post', data)
      .json()
      .then(res => {
        expect(res).to.be.an('object')
      })
  })

  it('#xsrf', function() {
    return request.xsrf()
      .then(xsrf => {
        expect(xsrf).to.be.a('string').which.has.lengthOf(32)
      })
  })
})
