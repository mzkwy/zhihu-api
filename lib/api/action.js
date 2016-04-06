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
    voteDown,
    sendMessage,
    block,
    unblock
}

/**
 * Follow a user.
 */
function follow(uname) {
    return _follow('follow_member', uname)
}

/**
 * Unfollow a user.
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
 */
function followTopic(tid) {
    return _followTopic('follow_topic', tid)
}

/**
 * Unfollow a topic.
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
 */
function followQuestion(qid) {
    return _followQuestion('follow_question', qid)
}

/**
 * Unfollow a question.
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
 */
function voteUp(id) {
    return _voteAnswer('vote_up', id)
}

/**
 * Vote down an answer.
 */
function voteDown(id) {
    return _voteAnswer('vote_down', id)
}

function _voteAnswer(method, id) {
    var url = urls.action.voteAnswer()

    return request.xsrf()
        .then(_xsrf => ({
            params: JSON.stringify({
                answer_id: '' + id
            }),
            method,
            _xsrf
        }))
        .then(data => request(url, data))
        .then(data => JSON.parse(data))
}

/**
 * Send message to a user.
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
 */
function block(uname) {
    return _block('add', uname)
}

/**
 * Unblock a user.
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
