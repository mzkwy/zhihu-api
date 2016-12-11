const account = require('./account')
const parser = require('../parser')

module.exports = function(req) {
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
      this._account = slug
    } else {
      this._account = {
        slug
      }
    }
    this._type = 'org'
  }

  Org.prototype._req = req
  Object.assign(Org.prototype, account, proto)

  return Org
}

var proto = {
  /**
   * Get detail profile of the organization.
   *
   * @public
   */
  detail() {
    var url = `/org/${this._account.slug}/about`
    return this._req.get(url)
      .then(parser.parseOrgDetail)
  }
}
