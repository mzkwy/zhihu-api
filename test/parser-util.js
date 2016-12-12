/* eslint-env mocha */
const expect = require('chai').expect
const cheerio = require('cheerio')
const util = require('../lib/parser/util')
const urls = require('../lib/urls')

var domstr = '<div id="example" class="container" data-name="test" data-id="123456" data-count="0">hello 世界</div>'
var $ = cheerio.load(domstr, {
  decodeEntities: false
})
var ele = $('div')

describe('parser util', function () {
  it('#getAttr', function () {
    expect(util.getAttr(ele, 'id')).to.equal('example')
    expect(util.getAttr(ele, 'class')).to.equal('container')
  })

  it('#getText', function () {
    expect(util.getText(ele)).to.equal('hello 世界')
  })

  it('#getData', function () {
    expect(util.getData(ele, 'name')).to.equal('test')
    expect(util.getData(ele, 'id')).to.equal(123456)
    expect(util.getData(ele, 'count')).to.equal(0)
    expect(util.getData(ele, 'none')).to.equal('')
  })

  it('#getHtml', function () {
    expect(util.getHtml($)).to.equal(domstr)
    expect(util.getHtml(ele)).to.equal('hello 世界')
  })

  it('#toNum', function () {
    expect(util.toNum(null)).to.equal(0)
    expect(util.toNum(undefined)).to.equal(0)
    expect(util.toNum([])).to.equal(0)
    expect(util.toNum('')).to.equal(0)
    expect(util.toNum('hell0')).to.equal(0)
    expect(util.toNum('123hell')).to.equal(123)
    expect(util.toNum('12345')).to.equal(12345)
  })

  it('#forEach', function () {
    var arr = [1, 2, 3]
    var res = []
    util.forEach(arr, x => res.push(x * x))
    expect(res).to.eql([1, 4, 9])
  })

  it('#map', function () {
    var arr = [1, 2, 3]
    var res = util.map(arr, x => x * x)
    expect(res).to.eql([1, 4, 9])
  })

  it('parseSlug', function () {
    var ret = util.parseSlug('/people/test')
    expect(ret.user_type).to.equal('people')
    expect(ret.url_token).to.equal('test')

    ret = util.parseSlug('/org/test')
    expect(ret.user_type).to.equal('organization')
    expect(ret.url_token).to.equal('test')

    ret = util.parseSlug('')
    expect(ret.name).to.equal('匿名用户')
  })
})
