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
 * User related url functions.
 */
exports.user = {
  home(uname) {
    return `${baseurl}/people/${uname}`
  },

  detail(uname) {
    return `${baseurl}/people/${uname}/about`
  },

  profile(uname) {
    var params = querystring.stringify({
      params: JSON.stringify({
        url_token: uname
      })
    })
    return `${baseurl}/node/MemberProfileCardV2?${params}`
  },

  followers() {
    return `${baseurl}/node/ProfileFollowersListV2`
  },

  followees() {
    return `${baseurl}/node/ProfileFolloweesListV2`
  },

  questions(uname, page = 1) {
    return `${baseurl}/people/${uname}/asks?page=${page}`
  },

  answers(uname, page = 1) {
    return `${baseurl}/people/${uname}/answers?page=${page}`
  },

  posts(uname, page = 1) {
    return `${baseurl}/people/${uname}/posts?page=${page}`
  },

  collections(uname, page = 1) {
    return `${baseurl}/people/${uname}/collections?page=${page}`
  },

  topics(uname) {
    return `${baseurl}/people/${uname}/topics`
  },

  columns() {
    return `${baseurl}/node/ProfileFollowedColumnsListV2`
  },

  activities(uname) {
    return `${baseurl}/people/${uname}/activities`
  }
}

/**
 * Question related url functions.
 */
exports.question = {
  home(id) {
    return `${baseurl}/question/${id}`
  },

  answersByVote() {
    return `${baseurl}/node/QuestionAnswerListV2`
  },

  answersByPage(id, page = 1) {
    var params = querystring.stringify({
      sort: 'created',
      page
    })
    return `${baseurl}/question/${id}?${params}`
  },

  followers(id) {
    return `${baseurl}/question/${id}/followers`
  }
}

/**
 * Answer related url functions.
 */
exports.answer = {
  voters(aid) {
    return `${baseurl}/answer/${aid}/voters_profile`
  },

  comments(aid, page = 1) {
    return `${baseurl}/r/answers/${aid}/comments?page=${page}`
  },

  explore: function(offset, type) {
    var params = JSON.stringify({
      offset,
      type
    })
    return `${baseurl}/node/ExploreAnswerListV2?params=${params}`
  }
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
 * Topic related url functions.
 */
exports.topic = {
  organize(id) {
    return `${baseurl}/topic/${id}/organize`
  },

  followers(id) {
    return `${baseurl}/topic/${id}/followers`
  },

  topAnswers(id, page = 1) {
    return `${baseurl}/topic/${id}/top-answers?page=${page}`
  },

  hotAnswers(id) {
    return `${baseurl}/topic/${id}/hot`
  },

  newAnswers(id) {
    return `${baseurl}/topic/${id}/newest`
  },

  pendingQuestions(id, page = 1) {
    return `${baseurl}/topic/${id}/questions?page=${page}`
  },

  hotPendingQuestions(id, page = 1) {
    return `${baseurl}/topic/${id}/unanswered?page=${page}`
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
