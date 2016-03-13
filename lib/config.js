var userAgent = ['Mozilla/5.0 (Windows NT 6.3; WOW64)',
    'AppleWebKit/537.36 (KHTML, like Gecko)',
    'Chrome/48.0.2564.116 Safari/537.36'
].join(' ')

var headers = {
    'User-Agent': userAgent,
    'Cookie': ''
}

function setCookie(cookie) {
    headers['Cookie'] = cookie || ''
}

function setUserAgent(userAgent) {
    headers['User-Agent'] = userAgent || ''
}

module.exports = {
    setCookie,
    setUserAgent,
    headers
}
