const request = require('request')
const cheerio = require('cheerio')
const urls = require('./urls')
const config = require('./config')

const transforms = {
  html: data => cheerio.load(data),
  json: data => JSON.parse(data)
}

exports = module.exports = sendRequest
exports.xsrf = get_xsrf

/**
 * Send a request.
 *
 * If `data` is specified, a POST request will be sent,
 * else a GET request.
 *
 * @param  {String} url
 * @param  {Object} data
 * @param  {String|Function} transform
 * @return {Promise}
 * @public
 */
function sendRequest(url, data, transform) {
  if (!config.cookie) {
    throw new Error('A cookie is needed. You should use ' +
      '`api.cookie(_cookie)` to set cookie.')
  }

  var opts = {
    url,
    method: 'GET',
    headers: config.headers
  }

  if (data) {
    opts.method = 'POST'
    opts.form = data
  }

  return new Promise((resolve, reject) => {
    request(opts, (err, res, body) => {
      if (err) {
        return reject(err)
      }

      if (typeof transform === 'string') {
        transform = transforms[transform.toLowerCase()]
      }

      if (typeof transform === 'function') {
        resolve(transform(body))
      } else {
        resolve(body)
      }
    })
  })
}

/**
 * Get `_xsrf`.
 *
 * @return {Promise}
 * @public
 */
function get_xsrf() {
  if (config.xsrf) {
    return Promise.resolve(config.xsrf)
  }

  return sendRequest(urls.index(), null, 'html')
    .then($ => {
      config.xsrf = $('input[name="_xsrf"]').val()
      return config.xsrf
    })
}
