const parse = require('cookie').parse

var userAgent = [
  'Mozilla/5.0 (Windows NT 6.3; WOW64)',
  'AppleWebKit/537.36 (KHTML, like Gecko)',
  'Chrome/48.0.2564.116 Safari/537.36'
].join(' ')

/**
 * Request headers.
 */
var headers = {
  'User-Agent': userAgent,
  'Cookie': ''
}

var data = {
  xsrf: ''
}

module.exports = {
  headers,

  get userAgent() {
    return headers['User-Agent']
  },

  set userAgent(val) {
    headers['User-Agent'] = (val || '').trim()
  },

  get cookie() {
    return headers['Cookie']
  },

  set cookie(val) {
    if (Buffer.isBuffer(val)) {
      val = val.toString()
    }

    val = (val || '').trim()
    headers['Cookie'] = val
    data.xsrf = parse(val)._xsrf || ''
  },

  get xsrf() {
    return data.xsrf
  },

  set xsrf(val) {
    data.xsrf = val
  }
}
