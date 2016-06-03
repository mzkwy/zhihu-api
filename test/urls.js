const expect = require('chai').expect
const urls = require('../lib/urls')
const baseurl = urls.baseurl

describe('urls', function() {
  it('urls.index()', function() {
    expect(urls.index()).to.equal(baseurl)
  })

  it('urls.full(path)', function() {
    expect(urls.full('')).to.equal('')
    expect(urls.full('/people/zhihuadmin')).to.equal(baseurl + '/people/zhihuadmin')
    expect(urls.full('people/zhihuadmin')).to.equal(baseurl + '/people/zhihuadmin')
    expect(urls.full('https://www.zhihu.com/people/zhihuadmin')).to.equal(baseurl + '/people/zhihuadmin')
  })

  describe('urls.user', function() {
    it('urls.user.home(uname)', function() {
      expect(urls.user.home('test')).to
        .equal(baseurl + '/people/test')
    })

    it('urls.user.detail(uname)', function() {
      expect(urls.user.detail('test')).to
        .equal(baseurl + '/people/test/about')
    })

    it('urls.user.profile(uname)', function() {
      expect(urls.user.profile('test')).to
        .equal(baseurl + '/node/MemberProfileCardV2?params=%7B%22url_token%22%3A%22test%22%7D')
    })

    it('urls.user.followers()', function() {
      expect(urls.user.followers()).to
        .equal(baseurl + '/node/ProfileFollowersListV2')
    })

    it('urls.user.followees()', function() {
      expect(urls.user.followees()).to
        .equal(baseurl + '/node/ProfileFolloweesListV2')
    })

    it('urls.user.questions(uname, page)', function() {
      expect(urls.user.questions('test', 1)).to
        .equal(baseurl + '/people/test/asks?page=1')
    })

    it('urls.user.answers(uname, page)', function() {
      expect(urls.user.answers('test', 1)).to
        .equal(baseurl + '/people/test/answers?page=1')
    })

    it('urls.user.posts(uname)', function() {
      expect(urls.user.posts('test')).to
        .equal(baseurl + '/people/test/posts?page=1')
    })

    it('urls.user.collections(uname, page)', function() {
      expect(urls.user.collections('test')).to
        .equal(baseurl + '/people/test/collections?page=1')
    })

    it('urls.user.topics(uname)', function() {
      expect(urls.user.topics('test')).to
        .equal(baseurl + '/people/test/topics')
    })

    it('urls.user.columns()', function() {
      expect(urls.user.columns()).to
        .equal(baseurl + '/node/ProfileFollowedColumnsListV2')
    })

    it('urls.user.activities(uname)', function() {
      expect(urls.user.activities('test')).to
        .equal(baseurl + '/people/test/activities')
    })
  })

  describe('urls.question', function() {
    it('urls.question.home(id)', function() {
      expect(urls.question.home(1234567)).to
        .equal(baseurl + '/question/1234567')
    })

    it('urls.question.answersByVote()', function() {
      expect(urls.question.answersByVote()).to
        .equal(baseurl + '/node/QuestionAnswerListV2')
    })

    it('urls.question.answersByPage(id, page)', function() {
      expect(urls.question.answersByPage(41325553)).to
        .equal(baseurl + '/question/41325553?sort=created&page=1')

      expect(urls.question.answersByPage(41325553, 2)).to
        .equal(baseurl + '/question/41325553?sort=created&page=2')
    })

    it('urls.question.followers(id)', function() {
      expect(urls.question.followers(1234567)).to
        .equal(baseurl + '/question/1234567/followers')
    })
  })

  describe('urls.answer', function() {
    it('urls.answer.voters(aid)', function() {
      expect(urls.answer.voters(1234567)).to
        .equal(baseurl + '/answer/1234567/voters_profile')
    })

    it('urls.answer.comments(aid, page)', function() {
      expect(urls.answer.comments(1234567)).to
        .equal(baseurl + '/r/answers/1234567/comments?page=1')

      expect(urls.answer.comments(1234567, 2)).to
        .equal(baseurl + '/r/answers/1234567/comments?page=2')
    })

    it('urls.answer.explore(offset, type)', function() {
      expect(urls.answer.explore(10, 'day')).to
        .equal(baseurl + '/node/ExploreAnswerListV2?params={"offset":10,"type":"day"}')

      expect(urls.answer.explore(10, 'month')).to
        .equal(baseurl + '/node/ExploreAnswerListV2?params={"offset":10,"type":"month"}')
    })
  })

  describe('urls.action', function() {
    it('urls.action.follow()', function() {
      expect(urls.action.follow()).to
        .equal(baseurl + '/node/MemberFollowBaseV2')
    })

    it('urls.action.followTopic()', function() {
      expect(urls.action.followTopic()).to
        .equal(baseurl + '/node/TopicFollowBaseV2')
    })

    it('urls.action.followQuestion()', function() {
      expect(urls.action.followQuestion()).to
        .equal(baseurl + '/node/QuestionFollowBaseV2')
    })

    it('urls.action.voteAnswer()', function() {
      expect(urls.action.voteAnswer()).to
        .equal(baseurl + '/node/AnswerVoteBarV2')
    })

    it('urls.action.sendMessage()', function() {
      expect(urls.action.sendMessage()).to
        .equal(baseurl + '/inbox/post')
    })

    it('urls.action.block(uname)', function() {
      expect(urls.action.block('test')).to
        .equal(baseurl + '/people/test/block')
    })
  })

  describe('urls.topic', function() {
    it('urls.topic.organize(id)', function() {
      expect(urls.topic.organize(1234567)).to
        .equal(baseurl + '/topic/1234567/organize')
    })

    it('urls.topic.followers(id)', function() {
      expect(urls.topic.followers(1234567)).to
        .equal(baseurl + '/topic/1234567/followers')
    })

    it('urls.topic.topAnswers(id, page)', function() {
      expect(urls.topic.topAnswers(1234567)).to
        .equal(baseurl + '/topic/1234567/top-answers?page=1')

      expect(urls.topic.topAnswers(1234567, 2)).to
        .equal(baseurl + '/topic/1234567/top-answers?page=2')
    })

    it('urls.topic.hotAnswers(id)', function() {
      expect(urls.topic.hotAnswers(1234567)).to
        .equal(baseurl + '/topic/1234567/hot')
    })

    it('urls.topic.newAnswers(id)', function() {
      expect(urls.topic.newAnswers(1234567)).to
        .equal(baseurl + '/topic/1234567/newest')
    })

    it('urls.topic.pendingQuestions(id)', function() {
      expect(urls.topic.pendingQuestions(1234567)).to
        .equal(baseurl + '/topic/1234567/questions?page=1')

      expect(urls.topic.pendingQuestions(1234567, 2)).to
        .equal(baseurl + '/topic/1234567/questions?page=2')
    })

    it('urls.topic.hotPendingQuestions(id)', function() {
      expect(urls.topic.hotPendingQuestions(1234567)).to
        .equal(baseurl + '/topic/1234567/unanswered?page=1')

      expect(urls.topic.hotPendingQuestions(1234567, 2)).to
        .equal(baseurl + '/topic/1234567/unanswered?page=2')
    })
  })
})
