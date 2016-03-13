const expect = require('chai').expect
const cheerio = require('cheerio')
const parser = require('../lib/parser')

var domstr = '<div id="example" class="container" data-name="test" data-id="123456">hello</div>'
var $ = cheerio.load(domstr)
var ele = $('div')

describe('parser', function() {
    it('parser.getAttr(ele, attr)', function() {
        expect(parser.getAttr(ele, 'id')).to.equal('example')
        expect(parser.getAttr(ele, 'class')).to.equal('container')
    })

    it('parser.getText(ele)', function() {
        expect(parser.getText(ele)).to.equal('hello')
    })

    it('parser.getData(ele, name)', function() {
        expect(parser.getData(ele, 'name')).to.equal('test')
        expect(parser.getData(ele, 'id')).to.equal(123456)
    })

    it('parser.toNum(val)', function() {
        expect(parser.toNum(null)).to.equal(0)
        expect(parser.toNum(undefined)).to.equal(0)
        expect(parser.toNum([])).to.equal(0)
        expect(parser.toNum('')).to.equal(0)
        expect(parser.toNum('hell0')).to.equal(0)
        expect(parser.toNum('123hell')).to.equal(123)
        expect(parser.toNum('12345')).to.equal(12345)
    })
})
