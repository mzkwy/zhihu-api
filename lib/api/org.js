const account = require('./account')
const parser = require('../parser')

module.exports = Org

/**
 * Initialize an `Org`.
 *
 * @param {string|object} uname
 * @public
 */
function Org (slug) {
  if (!(this instanceof Org)) {
    return new Org(slug)
  }

  if (typeof slug === 'object') {
    this._account = slug
  } else {
    this._account = {
      slug
    }
  }
  this._type = 'org'
}

Object.assign(Org.prototype, account)

/**
 * Get detail profile of the organization.
 *
 * @public
 */
Org.prototype.detail = function () {
  var url = `/org/${this._account.slug}/about`
  return this.get(url)
    .then(parser.parseOrgDetail)
}
