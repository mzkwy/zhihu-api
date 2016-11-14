const parser = require('../parser')
const baseurl = require('../util').baseurl

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
    this._user = slug
  } else {
    this._user = {
      slug
    }
  }
}

/**
 * Get the user's detail profile.
 *
 * @public
 */
User.prototype.detail = function() {
  var url = `/people/${this._user.slug}/about`
  return this.get(url)
    .then(parser.parseUserDetail)
}

/**
 * Get the user's profile.
 *
 * @public
 */
User.prototype.profile = function() {
  var url = `/node/MemberProfileCardV2`
  var params = {
    params: JSON.stringify({
      url_token: this._user.slug
    })
  }

  return this.get(url, params)
    .then(parser.parseUserProfile)
}

/**
 * Get the user's followers.
 *
 * @param {number} offset
 * @public
 */
User.prototype.followers = function(offset = 0) {
  var url = '/node/ProfileFollowersListV2'
  return this._listFollows(url, offset)
}

/**
 * Get the user's followees.
 *
 * @param {number} offset
 * @public
 */
User.prototype.followees = function(offset = 0) {
  var url = '/node/ProfileFolloweesListV2'
  return this._listFollows(url, offset)
}

User.prototype._listFollows = function(url, offset) {
  return Promise.all([
      this._hash(),
      this.xsrf()
    ])
    .then(arr => {
      var data = {
        method: 'next',
        params: JSON.stringify({
          order_by: 'created',
          offset: offset,
          hash_id: arr[0]
        }),
        _xsrf: arr[1]
      }
      return this.post(url, data).json()
    })
    .then(data => parser.parseUserFollows(data.msg))
}

/**
 * Get the user's activities.
 *
 * @param {number} [start] timestamp in second
 * @public
 */
User.prototype.activities = function(start) {
  return this.xsrf()
    .then(_xsrf => {
      var url = `/people/${this._user.slug}/activities`
      var data = {
        start,
        _xsrf
      }
      return this.post(url, data).json()
    })
    .then(data => parser.parseUserActivities(data.msg[1]))
}

/**
 * Get questions that this user asked.
 *
 * @param {number} page
 * @public
 */
User.prototype.questions = function(page = 1) {
  var url = `/people/${this._user.slug}/asks`
  var params = {
    page
  }

  return this.get(url, params)
    .then(parser.parseUserQuestions)
}

/**
 * Get the user's answers.
 *
 * @param {number} page
 * @public
 */
User.prototype.answers = function(page = 1) {
  var url = `/people/${this._user.slug}/answers`
  var params = {
    page
  }

  return this.get(url, params)
    .then(parser.parseUserAnswers)
}

/**
 * Get the user's posts.
 *
 * @param {number} page
 * @public
 */
User.prototype.posts = function(page = 1) {
  var url = `/people/${this._user.slug}/posts`
  var params = {
    page
  }

  return this.get(url, params)
    .then(parser.parseUserPosts)
}

/**
 * Get the user's collections.
 *
 * @param {number} page
 * @public
 */
User.prototype.collections = function(page = 1) {
  var url = `/people/${this._user.slug}/collections`
  var params = {
    page
  }

  return this.get(url, params)
    .then(parser.parseUserCollections)
}

/**
 * Get topics that the user followed.
 *
 * @param {number} offset
 * @public
 */
User.prototype.topics = function(offset = 0) {
  return this.xsrf()
    .then(_xsrf => {
      var url = `/people/${this._user.slug}/topics`
      var data = {
        start: 0,
        offset,
        _xsrf
      }
      return this.post(url, data).json()
    })
    .then(data => parser.parseUserTopics(data.msg[1]))
}

/**
 * Get columns that the user followed.
 *
 * @param {number} offset
 * @public
 */
User.prototype.columns = function(offset) {
  return Promise.all([
      this._hash(),
      this.xsrf()
    ])
    .then(arr => {
      var url = '/node/ProfileFollowedColumnsListV2'
      var data = {
        method: 'next',
        params: JSON.stringify({
          offset,
          limit: 20,
          hash_id: arr[0]
        }),
        _xsrf: arr[1]
      }
      return this.post(url, data).json()
    })
    .then(data => parser.parseUserColumns(data.msg))
}

/**
 * Get the user's hash.
 *
 * @private
 */
User.prototype._hash = function() {
  var hash = this._user.hash
  if (hash) {
    return Promise.resolve(hash)
  } else {
    return this.detail()
      .then(detail => {
        this._user.hash = detail.hash
        return detail.hash
      })
  }
}
