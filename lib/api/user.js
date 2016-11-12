const parser = require('../parser')
const baseurl = require('../util').baseurl

module.exports = User

/**
 * Initialize a `User`.
 *
 * @param {string|Object} slug
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
  var url = `${baseurl}/people/${this._user.slug}/about`
  return this.get(url)
    .then(parser.parseUserDetail)
}

/**
 * Get the user's profile.
 *
 * The url is:
 * https://www.zhihu.com/node/MemberProfileCardV2?params={"url_token":"${uname}"}
 * For example:
 * https://www.zhihu.com/node/MemberProfileCardV2?params={"url_token":"zhihuadmin"}
 *
 * @public
 */
User.prototype.profile = function() {
  var url = `${baseurl}/node/MemberProfileCardV2`
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
 * The url is: https://www.zhihu.com/people/${uname}/followers
 * For example: https://www.zhihu.com/people/zhihuadmin/followers
 *
 * @param {Number} [offset=0]
 * @public
 */
// proto.followers = function(offset) {
//   return this._hash()
//     .then(hash => listFollows('followers', hash, offset))
// }

/**
 * Get the user's followees.
 *
 * The url is: https://www.zhihu.com/people/${uname}/followees
 * For example: https://www.zhihu.com/people/zhihuadmin/followees
 *
 * @param {Number} [offset=0]
 * @public
 */
// proto.followees = function(offset) {
//   return this._hash()
//     .then(hash => listFollows('followees', hash, offset))
// }

// function listFollows(follow, hash_id, offset) {
//   var url = urls.user[follow]()

//   return request.xsrf()
//     .then(_xsrf => ({
//       method: 'next',
//       params: JSON.stringify({
//         order_by: 'created',
//         offset: offset || 0,
//         hash_id
//       }),
//       _xsrf
//     }))
//     .then(data => request(url, data))
//     .then(data => {
//       data = JSON.parse(data)
//       return parser.parseUserFollows(data.msg)
//     })
// }

/**
 * Get the user's activities.
 * @param {number} start timestamp in second
 *
 * The url is: https://www.zhihu.com/people/${uname}
 * For example: https://www.zhihu.com/people/zhihuadmin
 *
 * @param {Number} [start=Date.now()/1000] timestamp in seconds
 * @public
 */
// proto.activities = function(start) {
//   var uname = this._user.uname
//   var url = urls.user.activities(uname)

//   return request.xsrf()
//     .then(_xsrf => ({
//       start,
//       _xsrf
//     }))
//     .then(data => request(url, data))
//     .then(data => {
//       data = JSON.parse(data)
//       return parser.parseUserActivities(data.msg[1])
//     })
// }

/**
 * Get questions that this user asked.
 *
 * The url is: https://www.zhihu.com/people/${uname}/asks
 * For example: https://www.zhihu.com/people/zhihuadmin/asks
 *
 * @param {Number} [page=1]
 * @public
 */
// proto.questions = function(page) {
//   var uname = this._user.uname
//   var url = urls.user.questions(uname, page)

//   return request(url).then(parser.parseUserQuestions)
// }

/**
 * Get the user's answers.
 *
 * The url is: https://www.zhihu.com/people/${uname}/answers
 * For example: https://www.zhihu.com/people/zhihuadmin/answers
 *
 * @param {Number} [page=1]
 * @public
 */
// proto.answers = function(page) {
//   var uname = this._user.uname
//   var url = urls.user.answers(uname, page)

//   return request(url).then(parser.parseUserAnswers)
// }

/**
 * Get the user's posts.
 *
 * The url is: https://www.zhihu.com/people/${uname}/posts
 * For example: https://www.zhihu.com/people/zhihuadmin/posts
 *
 * @param {Number} [page=1]
 * @public
 */
// proto.posts = function(page) {
//   var uname = this._user.uname
//   var url = urls.user.posts(uname, page)

//   return request(url).then(parser.parseUserPosts)
// }

/**
 * Get the user's collections.
 *
 * The url is: https://www.zhihu.com/people/${uname}/collections
 * For example: https://www.zhihu.com/people/zhihuadmin/collections
 *
 * @param {Number} [page=1]
 * @public
 */
// proto.collections = function(page) {
//   var uname = this._user.uname
//   var url = urls.user.collections(uname, page)

//   return request(url).then(parser.parseUserCollections)
// }

/**
 * Get topics that the user followed.
 *
 * The url is: https://www.zhihu.com/people/${uname}/topics
 * For example: https://www.zhihu.com/people/zhihuadmin/topics
 *
 * @param {Number} [offset=0]
 * @public
 */
// proto.topics = function(offset) {
//   var uname = this._user.uname
//   var url = urls.user.topics(uname)

//   return request.xsrf()
//     .then(_xsrf => ({
//       start: 0,
//       offset: offset || 0,
//       _xsrf
//     }))
//     .then(data => request(url, data))
//     .then(data => {
//       data = JSON.parse(data)
//       return parser.parseUserTopics(data.msg[1])
//     })
// }

/**
 * Get columns that the user followed.
 *
 * The url is: https://www.zhihu.com/people/${uname}/columns/followed
 * For example: https://www.zhihu.com/people/zhihuadmin/columns/followed
 *
 * @param {Number} [offset=0]
 * @public
 */
// proto.columns = function(offset) {
//   var get_hash = this._hash()
//   var get_xsrf = request.xsrf()
//   var url = urls.user.columns()

//   return Promise.all([get_hash, get_xsrf])
//     .then(arr => ({
//       method: 'next',
//       params: JSON.stringify({
//         offset: offset || 0,
//         limit: 20,
//         hash_id: arr[0]
//       }),
//       _xsrf: arr[1]
//     }))
//     .then(data => request(url, data))
//     .then(data => {
//       data = JSON.parse(data)
//       return parser.parseUserColumns(data.msg)
//     })
// }

/**
 * Get the user's hash.
 *
 * @private
 */
// proto._hash = function() {
//   var hash = this._user.hash
//   if (hash) {
//     return Promise.resolve(hash)
//   } else {
//     return this.detail()
//       .then(detail => {
//         this._user.hash = detail.hash
//         return detail.hash
//       })
//   }
// }
