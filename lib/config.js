const parse = require('cookie').parse
const urls = require('./urls')

var userAgent = [
  'Mozilla/5.0 (Windows NT 6.3; WOW64)',
  'AppleWebKit/537.36 (KHTML, like Gecko)',
  'Chrome/48.0.2564.116 Safari/537.36'
].join(' ')

var headers = {
  'User-Agent': userAgent,
  'Cookie': '',
  'Referer': urls.baseurl
}

var _xsrf = ''

module.exports = {
  /**
   * Request headers.
   *
   * @public
   */
  headers,

  /**
   * @return {String}
   * @public
   */
  get userAgent() {
    return headers['User-Agent']
  },

  /**
   * @param {String} val
   * @public
   */
  set userAgent(val) {
    headers['User-Agent'] = (val || '').trim()
  },

  /**
   * @return {String}
   * @public
   */
  get cookie() {
    return headers['Cookie']
  },

  /**
   * @param {String|Buffer} val
   * @public
   */
  set cookie(val) {
    if (Buffer.isBuffer(val)) {
      val = val.toString()
    }

    val = (val || '').trim()
    headers['Cookie'] = val
    _xsrf = parse(val)._xsrf || ''
  },

  /**
   * @return {String}
   * @public
   */
  get xsrf() {
    return _xsrf
  },

  /**
   * @param {String} val
   * @public
   */
  set xsrf(val) {
    _xsrf = val
  }
}
