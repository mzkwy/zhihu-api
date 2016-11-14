const urls = require('../lib/urls')
const expect = require('chai').expect

describe('urls', function() {
  it('#baseurl', function() {
    expect(urls.baseurl).to.be.a('string')
  })

  it('#full', function() {
    var link = `${urls.baseurl}/people/test`

    expect(urls.full('')).to.equal('')
    expect(urls.full('/people/test')).to.equal(link)
    expect(urls.full('people/test')).to.equal(link)
    expect(urls.full(link)).to.equal(link)
  })
})
