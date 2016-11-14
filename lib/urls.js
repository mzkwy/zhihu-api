const querystring = require('querystring')

const baseurl = 'https://www.zhihu.com'

exports.baseurl = baseurl
exports.index = function() {
  return baseurl
}

/**
 * Return the full url with given `path`.
 *
 * Examples:
 *
 *   full('')
 *   // => ''
 *   full('/path')
 *   // => 'https://www.zhihu.com/path'
 *   full('path')
 *   // => 'https://www.zhihu.com/path'
 *   full('https://www.zhihu.com/path')
 *   // => 'https://www.zhihu.com/path'
 *
 * @param {String} path
 * @return {String}
 * @public
 */
exports.full = function(path) {
  if (!path) {
    return ''
  }
  if (path.indexOf(baseurl) === 0) {
    return path
  }
  if (path[0] !== '/') {
    path = '/' + path
  }
  return `${baseurl}${path}`
}

/**
 * Action related url functions.
 */
exports.action = {
  follow() {
    return `${baseurl}/node/MemberFollowBaseV2`
  },

  followTopic() {
    return `${baseurl}/node/TopicFollowBaseV2`
  },

  followQuestion() {
    return `${baseurl}/node/QuestionFollowBaseV2`
  },

  voteAnswer() {
    return `${baseurl}/node/AnswerVoteBarV2`
  },

  sendMessage() {
    return `${baseurl}/inbox/post`
  },

  block(uname) {
    return `${baseurl}/people/${uname}/block`
  }
}

/**
 * Organization related url functions.
 */
exports.org = {
  home(uname) {
    return `${baseurl}/org/${uname}`
  },

  detail(uname) {
    return `${baseurl}/org/${uname}/about`
  }
}
