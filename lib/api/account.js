const parser = require('../parser')

module.exports = {
  /**
   * Get profile of the account.
   *
   * @public
   */
  profile() {
    var url = `/node/MemberProfileCardV2`
    var params = {
      params: JSON.stringify({
        url_token: this._account.slug
      })
    }

    return this._req.get(url, params)
      .then(parser.parseAccountProfile)
  },

  /**
   * Get the account's followers.
   *
   * @param {number} offset
   * @public
   */
  followers(offset = 0) {
    var url = '/node/ProfileFollowersListV2'
    return this._listFollows(url, offset)
  },

  /**
   * Get the account's followees.
   *
   * @param {number} offset
   * @public
   */
  followees(offset = 0) {
    var url = '/node/ProfileFolloweesListV2'
    return this._listFollows(url, offset)
  },

  /**
   * List followers or followees.
   *
   * @private
   */
  _listFollows(url, offset) {
    return Promise.all([
        this._hash(),
        this._req.xsrf()
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
        return this._req.post(url, data).json()
      })
      .then(data => parser.parseAccountFollows(data.msg))
  },

  /**
   * Get the account's activities.
   *
   * @param {number} [start] timestamp in second
   * @public
   */
  activities(start) {
    return this.xsrf()
      .then(_xsrf => {
        var url = `/people/${this._account.slug}/activities`
        var data = {
          start,
          _xsrf
        }
        return this._req.post(url, data).json()
      })
      .then(data => parser.parseAccountActivities(data.msg[1]))
  },

  /**
   * Get questions that this account asked.
   *
   * @param {number} page
   * @public
   */
  questions(page = 1) {
    var url = `/${this._type}/${this._account.slug}/asks`
    var params = {
      page
    }

    return this._req.get(url, params)
      .then(parser.parseAccountQuestions)
  },

  /**
   * Get the account's answers.
   *
   * @param {number} page
   * @public
   */
  answers(page = 1) {
    var url = `/${this._type}/${this._account.slug}/answers`
    var params = {
      page
    }

    return this._req.get(url, params)
      .then(parser.parseAccountAnswers)
  },

  /**
   * Get the account's posts.
   *
   * @param {number} page
   * @public
   */
  posts(page = 1) {
    var url = `/${this._type}/${this._account.slug}/posts`
    var params = {
      page
    }

    return this._req.get(url, params)
      .then(parser.parseAccountPosts)
  },

  /**
   * Get topics that the account followed.
   *
   * @param {number} offset
   * @public
   */
  topics(offset = 0) {
    return this._req.xsrf()
      .then(_xsrf => {
        var url = `/people/${this._account.slug}/topics`
        var data = {
          start: 0,
          offset,
          _xsrf
        }
        return this._req.post(url, data).json()
      })
      .then(data => parser.parseAccountTopics(data.msg[1]))
  },

  /**
   * Get columns that the account followed.
   *
   * @param {number} offset
   * @public
   */
  columns(offset) {
    return Promise.all([
        this._hash(),
        this._req.xsrf()
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
        return this._req.post(url, data).json()
      })
      .then(data => parser.parseAccountColumns(data.msg))
  },

  /**
   * Get the account's hash.
   *
   * @private
   */
  _hash() {
    var hash = this._account.hash
    if (hash) {
      return Promise.resolve(hash)
    } else {
      return this.detail()
        .then(detail => {
          this._account.hash = detail.hash
          return detail.hash
        })
    }
  }
}
