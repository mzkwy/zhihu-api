const urls = require('../urls')

function isFunction(fn) {
  return typeof fn === 'function'
}

exports.getAttr = function(ele, attr) {
  return ele && isFunction(ele.attr) ? ele.attr(attr) || '' : ''
}

exports.getText = function(ele) {
  return ele && isFunction(ele.text) ? ele.text().trim() || '' : ''
}

exports.getData = function(ele, name) {
  var data = ele && isFunction(ele.data) ? ele.data(name) : ''
  return typeof data === 'number' ? data : (data || '')
}

exports.getHtml = function(ele) {
  return ele && isFunction(ele.html) ? ele.html() || '' : ''
}

exports.toNum = function(val) {
  if (!val) {
    return 0
  }
  val = parseInt(val, 10)
  return val || 0
}

exports.forEach = function(arr, fn) {
  return [].forEach.call(arr, fn)
}

exports.map = function(arr, fn) {
  return [].map.call(arr, fn)
}

exports.parseSlug = function(link) {
  var ret = {
    type: 'people'
  }

  if (!link) {
    ret.name = '匿名用户'
    return ret
  }

  var result = /\/(people|org)\/(.+)/.exec(link)
  if (result) {
    ret.user_type = result[1] === 'org' ? 'organization' : result[1]
    ret.url_token = result[2]
  }
  return ret
}
