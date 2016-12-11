const parser = require('../parser/user')

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
  Object.assign(User.prototype, proto)

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
      .then(parser.detail)
  },

  /**
   * Get the account's activities.
   *
   * @param {number} [start] timestamp in second
   * @public
   */
  activities(start) {
    // TODO
  },

  /**
   * Get questions that this account asked.
   *
   * @param {number} offset
   * @public
   */
  questions(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/questions`
    var params = {
      offset,
      limit: 20,
      include: [
        'data[*].created',
        'follower_count',
        'answer_count'
      ].join(',')
    }

    return this._req.getWithAuth(url, params)
      .then(parser.questions)
  },

  /**
   * Get the account's answers.
   *
   * @param {number} offset
   * @public
   */
  answers(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/answers`
    var params = {
      offset,
      limit: 20,
      sort_by: 'created',
      include: [
        'data[*].is_normal',
        'comment_count',
        'collapsed_counts',
        'reviewing_comments_count',
        'content',
        'voteup_count',
        'reshipment_settings',
        'mark_infos',
        'created_time',
        'updated_time'
      ].join(',')
    }

    return this._req.getWithAuth(url, params)
      .then(parser.answers)
  },

  /**
   * Get the account's articles.
   *
   * @param {number} page
   * @public
   */
  articles(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/articles`
    var params = {
      offset,
      limit: 20,
      sort_by: 'created',
      include: [
        'data[*].comment_count',
        'collapsed_counts',
        'reviewing_comments_count',
        'content',
        'voteup_count',
        'created',
        'updated'
      ].join(',')
    }

    return this._req.getWithAuth(url, params)
      .then(parser.articles)
  },

  /**
   * Get the user's collections.
   *
   * @param {number} page
   * @public
   */
  collections(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/favlists`
    var params = {
      offset,
      limit: 20,
      include: [
        'data[*].updated_time',
        'follower_count',
        'answer_count',
        'is_public'
      ].join(',')
    }

    return this._req.getWithAuth(url, params)
      .then(parser.collections)
  },

  /**
   * Get the account's followers.
   *
   * @param {number} offset
   * @public
   */
  followers(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/followers`
    var params = {
      offset,
      limit: 20
    }

    return this._req.getWithAuth(url, params)
      .then(parser.follows)
  },

  /**
   * Get the account's followees.
   *
   * @param {number} offset
   * @public
   */
  followees(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/followees`
    var params = {
      offset,
      limit: 20
    }

    return this._req.getWithAuth(url, params)
      .then(parser.follows)
  },

  /**
   * Get columns that the account owned.
   *
   * @param {number} offset
   * @public
   */
  columns(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/column-contributions`
    var params = {
      offset,
      limit: 20,
      include: [
        'data[*].column.title',
        'intro',
        'description',
        'followers',
        'articles_count'
      ].join(',')
    }

    return this._req.getWithAuth(url, params)
      .then(parser.columns)
  },

  /**
   * Get columns that the account followed.
   *
   * @param {number} offset
   * @public
   */
  followingColumns(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/following-columns`
    var params = {
      offset,
      limit: 20,
      include: [
        'data[*].intro',
        'followers',
        'articles_count',
        'image_url',
        'is_following'
      ].join(',')
    }

    return this._req.getWithAuth(url, params)
      .then(parser.followingColumns)
  },

  /**
   * Get topics that the account followed.
   *
   * @param {number} offset
   * @public
   */
  followingTopics(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/following-topic-contributions`
    var params = {
      offset,
      limit: 20
    }

    return this._req.getWithAuth(url, params)
      .then(parser.followingTopics)
  },

  /**
   * Get questions that the account followed.
   *
   * @param {number} offset
   * @public
   */
  followingQuestions(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/following-questions`
    var params = {
      offset,
      limit: 20,
      include: [
        'data[*].created',
        'answer_count',
        'follower_count'
      ].join(',')
    }

    return this._req.getWithAuth(url, params)
      .then(parser.followingQuestions)
  },

  /**
   * Get collections that the account followed.
   *
   * @param {number} offset
   * @public
   */
  followingCollections(offset = 0) {
    var url = `/api/v4/members/${this._account.slug}/following-favlists`
    var params = {
      offset,
      limit: 20,
      include: [
        'data[*].updated_time',
        'answer_count',
        'follower_count'
      ].join(',')
    }

    return this._req.getWithAuth(url, params)
      .then(parser.collections)
  }
}
