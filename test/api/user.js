const fs = require('fs')
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const config = require('../../lib/config')
const user = require('../../lib/api/user')

// set cookie
var cookiePath = path.join(__dirname, '../../cookie')
config.setCookie(fs.readFileSync(cookiePath))

chai.use(chaiAsPromised)
const expect = chai.expect

var uname = 'excited-vczh'

describe('api.user', function() {
    this.timeout(10000)

    it('api.user(uname)', function() {
        var account = user(uname)
        expect(account).to.have.property('_user')
        expect(account._user).to.have.property('uname')
        expect(account._user.uname).to.equal(uname)

        account = user({
            uname: uname
        })
        expect(account).to.have.property('_user')
        expect(account._user).to.have.property('uname')
        expect(account._user.uname).to.equal(uname)
    })

    it('#user.detail()', function() {
        var keys = ['name', 'uname', 'link', 'biology', 'weibo',
            'avatar', 'location', 'business', 'gender', 'company',
            'position', 'school', 'major', 'description', 'hash',
            'agrees', 'thanks', 'asks', 'answers', 'posts', 'collections',
            'logs', 'followees', 'followers', 'crawltime'
        ]
        var detail = user(uname).detail()
        expect(detail).to.be.a('promise')
        return expect(detail).to.eventually.have.all.keys(keys)
    })

    it('#user.profile()', function() {
        var keys = ['name', 'uname', 'link', 'avatar', 'gender',
            'biology', 'answers', 'posts', 'followers', 'hash', 'crawltime'
        ]
        var profile = user(uname).profile()
        expect(profile).to.be.a('promise')
        return expect(profile).to.eventually.have.all.keys(keys)
    })

    it('#user.followers()', function() {
        var keys = ['name', 'uname', 'link', 'hash']
        var followers = user(uname).followers()
        expect(followers).to.be.a('promise')
        return expect(followers).to.eventually.be.an('array')
    })

    it('#user.followees()', function() {
        var keys = ['name', 'uname', 'link', 'hash']
        var followees = user(uname).followees()
        expect(followees).to.be.a('promise')
        return expect(followees).to.eventually.be.an('array')
    })

    it('#user.answers(page)', function() {
        var answers = user(uname).answers(1)
        expect(answers).to.be.a('promise')
        return expect(answers).to.eventually.be.an('array')
    })
})
