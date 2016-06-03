const request = require('../request')
const urls = require('../urls')
const user = require('./user')

module.exports = {
  follow,
  unfollow,
  followTopic,
  unfollowTopic,
  followQuestion,
  unfollowQuestion,
  voteUp,
  voteNeutral,
  voteDown,
  sendMessage,
  block,
  unblock
}

/**
 * Follow a user.
 *
 * @param {String} uname
 * @public
 */
function follow(uname) {
  return _follow('follow_member', uname)
}

/**
 * Unfollow a user.
 *
 * @param {String} uname
 * @public
 */
function unfollow(uname) {
  return _follow('unfollow_member', uname)
}

function _follow(method, uname) {
  var get_hash = user(uname)._hash()
  var get_xsrf = request.xsrf()
  var url = urls.action.follow()

  return Promise.all([get_hash, get_xsrf])
    .then(arr => ({
      method: method,
      params: JSON.stringify({
        hash_id: arr[0]
      }),
      _xsrf: arr[1]
    }))
    .then(data => request(url, data))
    .then(data => JSON.parse(data))
}

/**
 * Follow a topic.
 *
 * @param {Number} tid
 * @public
 */
function followTopic(tid) {
  return _followTopic('follow_topic', tid)
}

/**
 * Unfollow a topic.
 *
 * @param {Number} tid
 * @public
 */
function unfollowTopic(tid) {
  return _followTopic('unfollow_topic', tid)
}

function _followTopic(method, tid) {
  var url = urls.action.followTopic()

  return request.xsrf()
    .then(_xsrf => ({
      params: JSON.stringify({
        topic_id: '' + tid
      }),
      method,
      _xsrf
    }))
    .then(data => request(url, data))
    .then(data => JSON.parse(data))
}

/**
 * Follow a question.
 *
 * @param {Number} qid
 * @public
 */
function followQuestion(qid) {
  return _followQuestion('follow_question', qid)
}

/**
 * Unfollow a question.
 *
 * @param {Number} qid
 * @public
 */
function unfollowQuestion(qid) {
  return _followQuestion('unfollow_question', qid)
}

function _followQuestion(method, qid) {
  var url = urls.action.followQuestion()

  return request.xsrf()
    .then(_xsrf => ({
      params: JSON.stringify({
        question_id: qid
      }),
      method,
      _xsrf
    }))
    .then(data => request(url, data))
    .then(data => JSON.parse(data))
}

/**
 * Vote up an answer.
 *
 * @param {Number} aid
 * @public
 */
function voteUp(aid) {
  return _voteAnswer('vote_up', aid)
}

/**
 * Vote neutral an answer.
 *
 * @param {Number} aid
 * @public
 */
function voteNeutral(aid) {
  return _voteAnswer('vote_neutral', aid)
}

/**
 * Vote down an answer.
 *
 * @param {Number} aid
 * @public
 */
function voteDown(aid) {
  return _voteAnswer('vote_down', aid)
}

function _voteAnswer(method, aid) {
  var url = urls.action.voteAnswer()

  return request.xsrf()
    .then(_xsrf => ({
      params: JSON.stringify({
        answer_id: '' + aid
      }),
      method,
      _xsrf
    }))
    .then(data => request(url, data))
    .then(data => JSON.parse(data))
}

/**
 * Send message to a user.
 *
 * @param {String} uname
 * @param {String} msg
 * @public
 */
function sendMessage(uname, msg) {
  var get_xsrf = request.xsrf()
  var get_hash = user(uname)._hash()
  var url = urls.action.sendMessage()

  return Promise.all([get_xsrf, get_hash])
    .then(arr => ({
      member_id: arr[1],
      content: msg,
      token: '',
      _xsrf: arr[0]
    }))
    .then(data => request(url, data))
    .then(data => JSON.parse(data))
}

/**
 * Block a user.
 *
 * @param {String} uname
 * @public
 */
function block(uname) {
  return _block('add', uname)
}

/**
 * Unblock a user.
 *
 * @param {String} uname
 * @public
 */
function unblock(uname) {
  return _block('cancel', uname)
}

function _block(action, uname) {
  var url = urls.action.block(uname)

  return request.xsrf()
    .then(_xsrf => ({
      action,
      _xsrf
    }))
    .then(data => request(url, data))
    .then(data => JSON.parse(data))
}
