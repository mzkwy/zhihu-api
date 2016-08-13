const expect = require('chai').expect
const assert = require('assert')
const urls = require('../lib/urls')
const baseurl = urls.baseurl
const user = urls.user

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
    it('urls.question.home(id)', () => {
      expect(urls.question.home(1234567)).to
        .equal(baseurl + '/question/1234567')
    })

    it('urls.question.answersByVote()', () => {
      expect(urls.question.answersByVote()).to
        .equal(baseurl + '/node/QuestionAnswerListV2')
    })

    it('urls.question.answersByPage(id, page)', () => {
      expect(urls.question.answersByPage(41325553)).to
        .equal(baseurl + '/question/41325553?sort=created&page=1')

      expect(urls.question.answersByPage(41325553, 2)).to
        .equal(baseurl + '/question/41325553?sort=created&page=2')
    })

    it('urls.question.followers(id)', () => {
      expect(urls.question.followers(1234567)).to
        .equal(baseurl + '/question/1234567/followers')
    })
  })

  describe('urls.answer', () => {
    it('urls.answer.voters(aid)', () => {
      expect(urls.answer.voters(1234567)).to
        .equal(baseurl + '/answer/1234567/voters_profile')
    })

    it('urls.answer.comments(aid, page)', () => {
      expect(urls.answer.comments(1234567)).to
        .equal(baseurl + '/r/answers/1234567/comments?page=1')

      expect(urls.answer.comments(1234567, 2)).to
        .equal(baseurl + '/r/answers/1234567/comments?page=2')
    })

    it('urls.answer.explore(offset, type)', () => {
      expect(urls.answer.explore(10, 'day')).to
        .equal(baseurl + '/node/ExploreAnswerListV2?params={"offset":10,"type":"day"}')

      expect(urls.answer.explore(10, 'month')).to
        .equal(baseurl + '/node/ExploreAnswerListV2?params={"offset":10,"type":"month"}')
    })
  })

  describe('urls.action', () => {
    it('urls.action.follow()', () => {
      expect(urls.action.follow()).to
        .equal(baseurl + '/node/MemberFollowBaseV2')
    })

    it('urls.action.followTopic()', () => {
      expect(urls.action.followTopic()).to
        .equal(baseurl + '/node/TopicFollowBaseV2')
    })

    it('urls.action.followQuestion()', () => {
      expect(urls.action.followQuestion()).to
        .equal(baseurl + '/node/QuestionFollowBaseV2')
    })

    it('urls.action.voteAnswer()', () => {
      expect(urls.action.voteAnswer()).to
        .equal(baseurl + '/node/AnswerVoteBarV2')
    })

    it('urls.action.sendMessage()', () => {
      expect(urls.action.sendMessage()).to
        .equal(baseurl + '/inbox/post')
    })

    it('urls.action.block(uname)', () => {
      expect(urls.action.block('test')).to
        .equal(baseurl + '/people/test/block')
    })
  })

  describe('urls.topic', () => {
    it('urls.topic.organize(id)', () => {
      expect(urls.topic.organize(1234567)).to
        .equal(baseurl + '/topic/1234567/organize')
    })

    it('urls.topic.followers(id)', () => {
      expect(urls.topic.followers(1234567)).to
        .equal(baseurl + '/topic/1234567/followers')
    })

    it('urls.topic.topAnswers(id, page)', () => {
      expect(urls.topic.topAnswers(1234567)).to
        .equal(baseurl + '/topic/1234567/top-answers?page=1')

      expect(urls.topic.topAnswers(1234567, 2)).to
        .equal(baseurl + '/topic/1234567/top-answers?page=2')
    })

    it('urls.topic.hotAnswers(id)', () => {
      expect(urls.topic.hotAnswers(1234567)).to
        .equal(baseurl + '/topic/1234567/hot')
    })

    it('urls.topic.newAnswers(id)', () => {
      expect(urls.topic.newAnswers(1234567)).to
        .equal(baseurl + '/topic/1234567/newest')
    })

    it('urls.topic.pendingQuestions(id)', () => {
      expect(urls.topic.pendingQuestions(1234567)).to
        .equal(baseurl + '/topic/1234567/questions?page=1')

      expect(urls.topic.pendingQuestions(1234567, 2)).to
        .equal(baseurl + '/topic/1234567/questions?page=2')
    })

    it('urls.topic.hotPendingQuestions(id)', () => {
      expect(urls.topic.hotPendingQuestions(1234567)).to
        .equal(baseurl + '/topic/1234567/unanswered?page=1')

      expect(urls.topic.hotPendingQuestions(1234567, 2)).to
        .equal(baseurl + '/topic/1234567/unanswered?page=2')
    })
  })
})
