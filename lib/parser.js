function getAttr(ele, attr) {
    return ele && typeof ele.attr === 'function' ? ele.attr(attr) || '' : ''
}

function getText(ele) {
    return ele && typeof ele.text === 'function' ? ele.text() || '' : ''
}

function getData(ele, name) {
    return ele && typeof ele.data === 'function' ? ele.data(name) || '' : ''
}

function toNum(text) {
    if (!text) {
        return 0
    }
    text = parseInt(text, 10)
    return text ? text : 0
}

module.exports = {
    getAttr,
    getText,
    getData,
    toNum
}
