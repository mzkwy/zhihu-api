const request = require('request')
const cheerio = require('cheerio')
const urls = require('./urls')
const config = require('./config')
const headers = config.headers

var xsrf = undefined

exports = module.exports = sendRequest
exports.xsrf = get_xsrf

function sendRequest(url, data) {
    var opts = {
        url,
        headers
    }
    if (data) {
        opts.method = 'POST'
        opts.form = data
    } else {
        opts.method = 'GET'
    }

    return new Promise(function(resolve, reject) {
        request(opts, function(err, res, body) {
            if (err) {
                return reject(err)
            }
            resolve(body)
        })
    })
}

function get_xsrf() {
    if (xsrf) {
        return Promise.resolve(xsrf)
    }
    return sendRequest(urls.index())
        .then(function(body) {
            var $ = cheerio.load(body)
            xsrf = $('input[name="_xsrf"]').val()
            return xsrf
        })
}
