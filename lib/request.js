const request = require('request')
const cheerio = require('cheerio')
const userAgent = require('ua-string')
const querystring = require('querystring')
const parseCookie = require('cookie').parse
const baseurl = require('./urls').baseurl
const debug = require('debug')('zhihu-api')

module.exports = Request

function Request() {
  this.headers = {
    'Cookie': '',
    'Referer': baseurl,
    'User-Agent': userAgent
  }
  this.authHeaders = {
    'Authorization': '',
    'Referer': baseurl,
    'User-Agent': userAgent
  }
  this._xsrf = ''
}

/**
 * Set cookies.
 *
 * @param {string|Buffer} cookie
 * @public
 */
Request.prototype.setCookie = function(cookie) {
  if (!cookie) {
    return
  }

  if (Buffer.isBuffer(cookie)) {
    cookie = cookie.toString()
  }
  cookie = (cookie || '').trim()

  this.headers['Cookie'] = cookie
  this._xsrf = parseCookie(cookie)._xsrf || ''
}

/**
 * Set proxy.
 *
 * @param {string} proxy
 * @public
 */
Request.prototype.setProxy = function(proxy) {
  this.proxy = proxy
}

/**
 * Send a GET request.
 *
 * @param  {string} url
 * @return {Promise}
 * @public
 */
Request.prototype.get = function(url, params) {
  if (params) {
    url += '?' + querystring.stringify(params)
  }
  var opts = {
    url,
    method: 'GET',
    headers: this.headers
  }
  debug('GET ', url)
  return this.request(opts)
}

/**
 * Send a GET request with authorization headers.
 *
 * @param  {string} url
 * @return {Promise}
 * @public
 */
Request.prototype.getWithAuth = function(url, params) {
  if (params) {
    url += '?' + querystring.stringify(params)
  }

  return this.auth()
    .then(() => {
      var opts = {
        url,
        method: 'GET',
        headers: this.authHeaders
      }
      debug('GET ', url)
      return this.request(opts).json()
    })
}

/**
 * Send a POST request.
 *
 * @param  {string} url
 * @param  {Object} data
 * @return {Promise}
 * @public
 */
Request.prototype.post = function(url, data) {
  var opts = {
    url,
    method: 'POST',
    headers: this.headers,
    form: data
  }
  debug('POST', url, data)
  return this.request(opts)
}

/**
 * Send an HTTP request.
 *
 * @param  {Object} opts
 * @return {Promise}
 * @public
 */
Request.prototype.request = function(opts) {
  if (opts.url.indexOf(baseurl) !== 0) {
    opts.url = baseurl + opts.url
  }

  if (this.proxy) {
    opts.proxy = this.proxy
  }

  var promise = new Promise((resolve, reject) => {
    request(opts, (err, res, body) => {
      return err ? reject(err) : resolve(body)
    })
  })

  promise.json = function() {
    return promise.then(JSON.parse)
  }

  promise.$ = function() {
    return promise.then(cheerio.load)
  }

  return promise
}

/**
 * Get xsrf.
 *
 * @return {Promise}
 * @public
 */
Request.prototype.xsrf = function() {
  if (this._xsrf) {
    return Promise.resolve(this._xsrf)
  }

  return this.get(baseurl, null, false)
    .$()
    .then($ => {
      this._xsrf = $('input[name="_xsrf"]').val()
      return this._xsrf
    })
}

/**
 * Get authorization.
 *
 * @return {Promise}
 * @public
 */
Request.prototype.auth = function() {
  if (this.authHeaders.Authorization) {
    return this.authHeaders.Authorization
  }

  var tapUrl = '/people/zhihuadmin/collections'
  return this.get(tapUrl, null, false)
    .$()
    .then($ => {
      var data = $('#data').data('state')
      this.authHeaders.Authorization = `Bearer ${data.token.zc0}`
      return this.authHeaders.Authorization
    })
}
