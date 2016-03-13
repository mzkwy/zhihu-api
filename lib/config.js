const fs = require('fs')

var userAgent = ['Mozilla/5.0 (Windows NT 6.3; WOW64)',
    'AppleWebKit/537.36 (KHTML, like Gecko)',
    'Chrome/48.0.2564.116 Safari/537.36'
].join(' ')

var headers = {
    'User-Agent': userAgent,
    'Cookie': ''
}

function setCookie(cookiePath) {
    try {
        var cookie = fs.readFileSync(cookiePath)
        headers['Cookie'] = cookie.toString()
    } catch (e) {
        throw new Error('Error occurs get cookie')
    }
}

module.exports = {
    setCookie,
    headers
}
