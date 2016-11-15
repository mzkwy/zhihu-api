const account = require('./account')
const parser = require('../parser')

module.exports = User

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

Object.assign(User.prototype, account)

/**
 * Get the user's detail profile.
 *
 * @public
 */
User.prototype.detail = function() {
  var url = `/people/${this._account.slug}/about`
  return this.get(url)
    .then(parser.parseUserDetail)
}

/**
 * Get the user's collections.
 *
 * @param {number} page
 * @public
 */
User.prototype.collections = function(page = 1) {
  var url = `/people/${this._account.slug}/collections`
  var params = {
    page
  }

  return this.get(url, params)
    .then(parser.parseUserCollections)
}
