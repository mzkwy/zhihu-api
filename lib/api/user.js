const account = require('./account')
const parser = require('../parser')

module.exports = function(req) {
  /**
   * Initialize a `User`.
   *
   * @param {string|object} slug
   * @public
   */
  function User(slug) {
    if (!(this instanceof User)) {
      return new User(slug)
    }

    if (typeof slug === 'object') {
      this._account = slug
    } else {
      this._account = {
        slug
      }
    }
    this._type = 'people'
  }

  User.prototype._req = req
  Object.assign(User.prototype, account, proto)

  return User
}

var proto = {
  /**
   * Get the user's detail profile.
   *
   * @public
   */
  detail() {
    var url = `/people/${this._account.slug}/collections`
    return this._req.get(url)
      .$()
      .then(parser.parseUserDetail)
  },

  /**
   * Get the user's collections.
   *
   * @param {number} page
   * @public
   */
  collections(page = 1) {
    var url = `/people/${this._account.slug}/collections`
    var params = {
      page
    }

    return this._req.get(url, params)
      .then(parser.parseUserCollections)
  }
}
