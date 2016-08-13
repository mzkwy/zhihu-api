const assert = require('assert')
const urls = require('../lib/urls')
const baseurl = urls.baseurl
const user = urls.user
const question = urls.question
const answer = urls.answer
const action = urls.action
const topic = urls.topic
const org = urls.org

describe('urls', () => {
  it('.index()', () => {
    assert(urls.index() === baseurl)
  })

  it('.full(path)', () => {
    var link = `${baseurl}/people/test`
    assert(urls.full('') === '')
    assert(urls.full('/people/test') === link)
    assert(urls.full('people/test') === link)
    assert(urls.full(link) === link)
  })

  describe('urls.user', () => {
    it('.home(uname)', () => {
      assert(user.home('test') === `${baseurl}/people/test`)
    })

    it('.detail(uname)', () => {
      assert(user.detail('test') === `${baseurl}/people/test/about`)
    })

    it('.profile(uname)', () => {
      var link = `${baseurl}/node/MemberProfileCardV2?params=%7B%22url_token%22%3A%22test%22%7D`
      assert(user.profile('test') === link)
    })

    it('.followers()', () => {
      assert(user.followers() === `${baseurl}/node/ProfileFollowersListV2`)
    })

    it('.followees()', () => {
      assert(user.followees() === `${baseurl}/node/ProfileFolloweesListV2`)
    })

    it('.questions(uname, page)', () => {
      var link = `${baseurl}/people/test/asks?page=1`
      assert(user.questions('test') === link)
      assert(user.questions('test', 1) === link)
    })

    it('.answers(uname, page)', () => {
      var link = `${baseurl}/people/test/answers?page=1`
      assert(user.answers('test') === link)
      assert(user.answers('test', 1) === link)
    })

    it('.posts(uname)', () => {
      var link = `${baseurl}/people/test/posts?page=1`
      assert(user.posts('test') === link)
      assert(user.posts('test', 1) === link)
    })

    it('.collections(uname, page)', () => {
      var link = `${baseurl}/people/test/collections?page=1`
      assert(user.collections('test') === link)
      assert(user.collections('test', 1) === link)
    })

    it('.topics(uname)', () => {
      assert(user.topics('test') === `${baseurl}/people/test/topics`)
    })

    it('.columns()', () => {
      assert(user.columns() === `${baseurl}/node/ProfileFollowedColumnsListV2`)
    })

    it('.activities(uname)', () => {
      assert(user.activities('test') === `${baseurl}/people/test/activities`)
    })
  })

  describe('urls.question', () => {
    it('.home(id)', () => {
      assert(question.home(1234567) === `${baseurl}/question/1234567`)
    })

    it('.answersByVote()', () => {
      assert(question.answersByVote() === `${baseurl}/node/QuestionAnswerListV2`)
    })

    it('.answersByPage(id, page)', () => {
      var link = `${baseurl}/question/1234567?sort=created&page=1`
      assert(question.answersByPage(1234567) === link)
      assert(question.answersByPage(1234567, 1) === link)
    })

    it('.followers(id)', () => {
      assert(question.followers(1234567) === `${baseurl}/question/1234567/followers`)
    })
  })

  describe('urls.answer', () => {
    it('.voters(aid)', () => {
      assert(answer.voters(1234567) === `${baseurl}/answer/1234567/voters_profile`)
    })

    it('.comments(aid, page)', () => {
      var link = `${baseurl}/r/answers/1234567/comments?page=1`
      assert(answer.comments(1234567) === link)
      assert(answer.comments(1234567, 1) === link)
    })

    it('.explore(offset, type)', () => {
      assert(answer.explore(10, 'day') === `${baseurl}/node/ExploreAnswerListV2?params={"offset":10,"type":"day"}`)
      assert(answer.explore(10, 'month') === `${baseurl}/node/ExploreAnswerListV2?params={"offset":10,"type":"month"}`)
    })
  })

  describe('urls.action', () => {
    it('.follow()', () => {
      assert(action.follow() === `${baseurl}/node/MemberFollowBaseV2`)
    })

    it('.followTopic()', () => {
      assert(action.followTopic() === `${baseurl}/node/TopicFollowBaseV2`)
    })

    it('.followQuestion()', () => {
      assert(action.followQuestion() === `${baseurl}/node/QuestionFollowBaseV2`)
    })

    it('.voteAnswer()', () => {
      assert(action.voteAnswer() === `${baseurl}/node/AnswerVoteBarV2`)
    })

    it('.sendMessage()', () => {
      assert(action.sendMessage() === `${baseurl}/inbox/post`)
    })

    it('.block(uname)', () => {
      assert(action.block('test') === `${baseurl}/people/test/block`)
    })
  })

  describe('urls.topic', () => {
    it('.organize(id)', () => {
      assert(topic.organize(1234567) === `${baseurl}/topic/1234567/organize`)
    })

    it('.followers(id)', () => {
      assert(topic.followers(1234567) === `${baseurl}/topic/1234567/followers`)
    })

    it('.topAnswers(id, page)', () => {
      var link = `${baseurl}/topic/1234567/top-answers?page=1`
      assert(topic.topAnswers(1234567) === link)
      assert(topic.topAnswers(1234567, 1) === link)
    })

    it('.hotAnswers(id)', () => {
      assert(topic.hotAnswers(1234567) === `${baseurl}/topic/1234567/hot`)
    })

    it('.newAnswers(id)', () => {
      assert(topic.newAnswers(1234567) === `${baseurl}/topic/1234567/newest`)
    })

    it('.pendingQuestions(id)', () => {
      var link = `${baseurl}/topic/1234567/questions?page=1`
      assert(topic.pendingQuestions(1234567) === link)
      assert(topic.pendingQuestions(1234567, 1) === link)
    })

    it('.hotPendingQuestions(id)', () => {
      var link = `${baseurl}/topic/1234567/unanswered?page=1`
      assert(topic.hotPendingQuestions(1234567) === link)
      assert(topic.hotPendingQuestions(1234567, 1) === link)
    })
  })

  describe('urls.org', () => {
    it('.home(uname)', () => {
      assert(org.home('test') === `${baseurl}/org/test`)
    })

    it('.detail(uname)', () => {
      assert(org.detail('test') === `${baseurl}/org/test/about`)
    })
  })
})
