const parser = require('../parser/user')

module.exports = function(req) {
  /**
   * Initialize a `User`.
   *
   * @param {string} url_token
   * @public
   */
  function User(url_token) {
    if (!(this instanceof User)) {
      return new User(url_token)
    }

    this.url_token = url_token
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
    var url = `/people/${this.url_token}/collections`
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
    var url = `/api/v4/members/${this.url_token}/questions`
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
    var url = `/api/v4/members/${this.url_token}/answers`
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
    var url = `/api/v4/members/${this.url_token}/articles`
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
    var url = `/api/v4/members/${this.url_token}/favlists`
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
    var url = `/api/v4/members/${this.url_token}/followers`
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
    var url = `/api/v4/members/${this.url_token}/followees`
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
    var url = `/api/v4/members/${this.url_token}/column-contributions`
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
    var url = `/api/v4/members/${this.url_token}/following-columns`
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
    var url = `/api/v4/members/${this.url_token}/following-topic-contributions`
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
    var url = `/api/v4/members/${this.url_token}/following-questions`
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
    var url = `/api/v4/members/${this.url_token}/following-favlists`
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
