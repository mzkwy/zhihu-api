function getAttr(ele, attr) {
    return ele && typeof ele.attr === 'function' ? ele.attr(attr) || '' : ''
}

function getText(ele) {
    return ele && typeof ele.text === 'function' ? ele.text() || '' : ''
}

function getData(ele, name) {
    var data = ele && typeof ele.data === 'function' ? ele.data(name) : ''
    return typeof data === 'number' ? data : (data || '')
}

function getHtml(ele) {
    return ele && typeof ele.html === 'function' ? ele.html() || '' : ''
}

function toNum(val) {
    if (!val) {
        return 0
    }
    val = parseInt(val, 10)
    return val ? val : 0
}

function forEach(arr, fn) {
    return [].forEach.call(arr, fn)
}

function map(arr, fn) {
    return [].map.call(arr, fn)
}

module.exports = {
    getAttr,
    getText,
    getData,
    getHtml,
    toNum,
    forEach,
    map
}
