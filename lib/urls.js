const querystring = require('querystring')

const baseurl = 'https://www.zhihu.com'

/**
 * Identical function.
 *
 * @param {*} val
 * @private
 */
function id(val) {
  return function() {
    return val
  }
}

exports.baseurl = baseurl
exports.index = id(baseurl)

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
  home: function(uname) {
    return `${baseurl}/people/${uname}`
  },
  detail: function(uname) {
    return `${baseurl}/people/${uname}/about`
  },
  profile: function(uname) {
    var params = querystring.stringify({
      params: JSON.stringify({
        url_token: uname
      })
    })
    return `${baseurl}/node/MemberProfileCardV2?${params}`
  },
  followers: id(`${baseurl}/node/ProfileFollowersListV2`),
  followees: id(`${baseurl}/node/ProfileFolloweesListV2`),
  questions: function(uname, page) {
    page = page || 1
    return `${baseurl}/people/${uname}/asks?page=${page}`
  },
  answers: function(uname, page) {
    page = page || 1
    return `${baseurl}/people/${uname}/answers?page=${page}`
  },
  posts: function(uname, page) {
    page = page || 1
    return `${baseurl}/people/${uname}/posts?page=${page}`
  },
  collections: function(uname, page) {
    page = page || 1
    return `${baseurl}/people/${uname}/collections?page=${page}`
  },
  topics: function(uname) {
    return `${baseurl}/people/${uname}/topics`
  },
  columns: id(`${baseurl}/node/ProfileFollowedColumnsListV2`),
  activities: function(uname) {
    return `${baseurl}/people/${uname}/activities`
  }
}

/**
 * Question related url functions.
 */
exports.question = {
  home: function(id) {
    return `${baseurl}/question/${id}`
  },
  answersByVote: id(`${baseurl}/node/QuestionAnswerListV2`),
  answersByPage: function(id, page) {
    var params = querystring.stringify({
      sort: 'created',
      page: page || 1
    })
    return `${baseurl}/question/${id}?${params}`
  },
  followers: function(id) {
    return `${baseurl}/question/${id}/followers`
  }
}

/**
 * Answer related url functions.
 */
exports.answer = {
  voters: function(aid) {
    return `${baseurl}/answer/${aid}/voters_profile`
  },
  comments: function(aid, page) {
    page = page || 1
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
  follow: id(`${baseurl}/node/MemberFollowBaseV2`),
  followTopic: id(`${baseurl}/node/TopicFollowBaseV2`),
  followQuestion: id(`${baseurl}/node/QuestionFollowBaseV2`),
  voteAnswer: id(`${baseurl}/node/AnswerVoteBarV2`),
  sendMessage: id(`${baseurl}/inbox/post`),
  block: function(uname) {
    return `${baseurl}/people/${uname}/block`
  }
}

/**
 * Topic related url functions.
 */
exports.topic = {
  organize: function(id) {
    return `${baseurl}/topic/${id}/organize`
  },
  followers: function(id) {
    return `${baseurl}/topic/${id}/followers`
  },
  topAnswers: function(id, page) {
    page = page || 1
    return `${baseurl}/topic/${id}/top-answers?page=${page}`
  },
  hotAnswers: function(id) {
    return `${baseurl}/topic/${id}/hot`
  },
  newAnswers: function(id) {
    return `${baseurl}/topic/${id}/newest`
  },
  pendingQuestions: function(id, page) {
    page = page || 1
    return `${baseurl}/topic/${id}/questions?page=${page}`
  },
  hotPendingQuestions: function(id, page) {
    page = page || 1
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

  detail(uname){
    return `${baseurl}/org/${uname}/about`
  }
}
