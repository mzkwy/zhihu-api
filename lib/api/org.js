const parser = require('../parser')

module.exports = Org

/**
 * Initialize an `Org`.
 *
 * @param {string|object} uname
 * @public
 */
function Org(slug) {
  if (!(this instanceof Org)) {
    return new Org(slug)
  }

  if (typeof slug === 'object') {
    this._org = slug
  } else {
    this._org = {
      slug
    }
  }
}

/**
 * Get detail profile of the organization.
 *
 * @public
 */
Org.prototype.detail = function() {
  var url = `/org/${this._org.slug}/about`
  return this.get(url)
    .then(parser.parseOrgDetail)
}
