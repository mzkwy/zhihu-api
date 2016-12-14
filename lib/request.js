const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const request = require('request')
const cheerio = require('cheerio')
const userAgent = require('ua-string')
const mkdirp = require('mkdirp')
const parseCookie = require('cookie').parse
const baseurl = require('./urls').baseurl
const debug = require('debug')('zhihu-api')

module.exports = Request

/**
 * Request wrapper.
 */
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
 * Set cookie.
 *
 * @param {String|Buffer} cookie
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
 * @param {String} proxy
 * @public
 */
Request.prototype.setProxy = function(proxy) {
  this.proxy = proxy
}

/**
 * Send an HTTP request.
 *
 * Usage:
 *
 *  request(url)
 *  request({ method, url })
 *  request({ method, url }, true)
 *
 * @param  {Object}  opts
 * @param  {Boolean} useCookie
 * @return {Promise}
 * @public
 */
Request.prototype.request = function(opts, useCookie) {
  if (typeof opts === 'string') {
    opts = {
      url: opts
    }
  }

  if (opts.url.indexOf(baseurl) !== 0) {
    opts.url = baseurl + opts.url
  }

  if (!opts.method) {
    opts.method = 'GET'
  }

  if (this.proxy) {
    opts.proxy = this.proxy
  }

  var promise = null

  if (useCookie) {
    opts.headers = this.headers
    promise = sendRequest(opts)
  } else {
    promise = this.auth()
      .then(() => {
        opts.headers = this.authHeaders
        return sendRequest(opts)
      })
  }

  return promise
}

/**
 * Send a GET request.
 *
 * @param  {String}  url
 * @param  {Object}  params
 * @param  {Boolean} useCookie
 * @return {Promise}
 * @public
 */
Request.prototype.get = function(url, params, useCookie) {
  if (params) {
    url += '?' + querystring.stringify(params)
  }

  var opts = {
    url,
    method: 'GET'
  }

  return this.request(opts, useCookie)
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

  return this.request(baseurl, true)
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
    return Promise.resolve(this.authHeaders.Authorization)
  }

  var tapUrl = '/people/zhihuadmin/collections'
  return this.request(tapUrl, true)
    .then($ => {
      var data = $('#data').data('state')
      this.authHeaders.Authorization = `Bearer ${data.token.zc0}`
      return this.authHeaders.Authorization
    })
}

/**
 * Download file.
 *
 * @param  {Object} opts
 * @return {Promise}
 * @public
 */
Request.prototype.download = function(opts) {
  if (!fs.existsSync(opts.dir)) {
    mkdirp.sync(opts.dir)
  }

  var file = path.join(opts.dir, opts.filename)

  debug('DOWNLOAD', opts.src)

  return new Promise((resolve, reject) => {
    request.get(opts.src)
      .on('response', res => {
        res.pipe(fs.createWriteStream(file))
        res.on('error', reject)
        res.on('end', () => resolve(opts))
      })
  })
}

/**
 * @param  {Object} opts
 * @return {Promise}
 * @private
 */
function sendRequest(opts) {
  debug(opts.method, opts.url)

  return new Promise((resolve, reject) => {
    request(opts, (err, res, body) => {
      if (err) {
        return reject(err)
      }

      var contentType = res.headers['content-type'] || ''
      var ret = body

      if (contentType.indexOf('application/json') >= 0) {
        try {
          ret = JSON.parse(body)
        } catch (e) {
          ret = body
        }
      } else if (contentType.indexOf('text/html') >= 0) {
        try {
          ret = cheerio.load(body)
        } catch (e) {
          ret = body
        }
      }

      resolve(ret)
    })
  })
}
