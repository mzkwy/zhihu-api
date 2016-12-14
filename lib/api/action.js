module.exports = function(req) {
  var action = Object.assign({}, proto)
  action._req = req

  return action
}

var proto = {
  /**
   * Follow a user.
   *
   * @param  {String} url_token
   * @return {Promise}
   * @public
   */
  follow(url_token) {
    var url = `/api/v4/members/${url_token}/followers`

    return this._req.request({
      url,
      method: 'POST'
    })
  },

  /**
   * Unfollow a user.
   *
   * @param  {String} url_token
   * @return {Promise}
   * @public
   */
  unfollow(url_token) {
    var url = `/api/v4/members/${url_token}/followers`

    return this._req.request({
      url,
      method: 'DELETE'
    })
  },

  /**
   * Send message to a user.
   *
   * @param  {String} user_id
   * @param  {String} content
   * @return {Promise}
   * @public
   */
  message(user_id, content) {
    var url = '/api/v4/messages'
    var json = {
      content,
      type: 'common',
      receiver_hash: user_id
    }

    return this._req.request({
      url,
      json,
      method: 'POST'
    })
  },

  /**
   * Identical to message(user_id, content).
   *
   * @public
   */
  msg(user_id, content) {
    return this.message(user_id, content)
  },

  /**
   * Vote an answer.
   *
   * @param  {Number} answer_id
   * @param  {Number} type_val -1, 0, 1
   * @return {Promise}
   * @public
   */
  vote(answer_id, type_val) {
    var url = `/api/v4/answers/${answer_id}/voters`
    var type = type_val > 0 ? 'up' : (type_val < 0 ? 'down' : 'neutral')

    return this._req.request({
      url,
      method: 'POST',
      json: {
        type
      }
    })
  },

  /**
   * Identical to vote(answer_id, 1).
   *
   * @public
   */
  voteUp(answer_id) {
    return this.vote(answer_id, 1)
  },

  /**
   * Identical to vote(answer_id, 0).
   *
   * @public
   */
  voteNeutral(answer_id) {
    return this.vote(answer_id, 0)
  },

  /**
   * Identical to vote(answer_id, -1).
   *
   * @public
   */
  voteDown(answer_id) {
    return this.vote(answer_id, -1)
  }
}
