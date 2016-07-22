const request = require('../request')
const parser = require('../parser')
const urls = require('../urls')

module.exports = Organization

/**
 * Initialize `Organization` with given `uname`.
 *
 * If `uname` is an object, then it must have `uname` property.
 *
 * @param {String|Object} uname
 * @public
 */
function Organization(uname) {
  if (!(this instanceof Organization)) {
    return new Organization(uname)
  }

  if (typeof uname === 'object') {
    this._org = uname
  } else {
    this._org = {
      uname
    }
  }
}

var proto = Organization.prototype

/**
 * Get detail profile of the organization.
 *
 * @return {Promise<Object>}
 * @public
 */
proto.detail = function() {
  var uname = this._org.uname
  var url = urls.org.detail(uname)

  return request(url).then(parser.parseOrgDetail)
}
