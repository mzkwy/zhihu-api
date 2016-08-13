const assert = require('assert')
const config = require('../lib/config')

describe('config', () => {
  it('config.headers', () => {
    assert(typeof config.headers['User-Agent'] === 'string')
    assert(typeof config.headers['Cookie'] === 'string')
    assert(typeof config.headers['Referer'] === 'string')
  })

  it('config.userAgent', () => {
    var headers = config.headers
    var ua = 'customized user-agent'

    assert(config.userAgent === headers['User-Agent'])
    config.userAgent = ua
    assert(ua === headers['User-Agent'])
  })

  it('config.cookie', () => {
    var headers = config.headers
    var cookie = 'hello=world'

    assert(config.cookie === headers['Cookie'])
    config.cookie = cookie
    assert(cookie === headers['Cookie'])
  })

  it('config.xsrf', () => {
    var xsrf = '1234567890'
    config.xsrf = xsrf
    assert(config.xsrf === xsrf)

    config.cookie = 'hello=world'
    assert(config.xsrf === '')

    config.cookie = 'hello=world; _xsrf=1234567890'
    assert(config.xsrf === '1234567890')
  })
})
