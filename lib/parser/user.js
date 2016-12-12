const only = require('only')
const refProps = require('./refProps')

module.exports = {
  /**
   * User profile.
   */
  profile($, url_token) {
    var data = $('#data').data('state')

    try {
      var user = data.entities.users[url_token]
      var props = [
        'id',
        'name',
        'type',
        'userType',
        'urlToken',
        'gender',
        'messageThreadToken',
        'avatarUrl',
        'coverUrl',
        'headline',
        'description',
        'isBindSina',
        'showSinaWeibo',
        'sinaWeiboUrl',
        'badge',

        'followerCount',
        'followingCount',
        'questionCount',
        'answerCount',
        'articlesCount',
        'markedAnswersCount',
        'markedAnswersText',
        'followingTopicCount',
        'followingQuestionCount',
        'followingColumnsCount',
        'followingFavlistsCount',
        'favoriteCount',
        'favoritedCount',
        'thankedCount',
        'hostedLiveCount',
        'participatedLiveCount',
        'logsCount',
        'voteupCount',

        'accountStatus',
        'isForceRenamed',
        'isActive'
      ]
      var topicProps = refProps.topic

      var ret = only(user, props)
      ret.business = only(user.business, topicProps)
      ret.locations = user.locations.map(obj => only(obj, topicProps))
      ret.educations = user.educations.map(obj => ({
        school: only(obj.school, topicProps),
        major: only(obj.major, topicProps)
      }))
      ret.employments = user.employments.map(obj => ({
        company: only(obj.company, topicProps),
        job: only(obj.job, topicProps)
      }))

      return ret
    } catch (e) {
      return {
        url_token
      }
    }
  },

  /**
   * Activities.
   */
  activities(data) {
    if (!data || !data.data) {
      return []
    }

    var props = [
      'id',
      'created_time',
      'verb',
      'action_text'
    ]
    var actorProps = refProps.user

    return data.data.map(obj => {
      var ret = only(obj, props)
      ret.actor = only(obj.actor, actorProps)
      ret.target = parseTarget(obj.target)
      return ret
    })

    function parseTarget(target) {
      switch (target.type) {
        case 'topic':
          return only(target, refProps.topic)
        case 'question':
          return only(target, refProps.question)
        case 'answer':
          var answer = only(target, refProps.answer)
          answer.question = only(target.question, refProps.question)
          answer.author = only(target.author, refProps.user)
          return answer
        case 'column':
          var column = only(target, refProps.column)
          column.author = only(target.author, refProps.user)
          return column
        case 'collection':
          return only(target, refProps.collection)
        default:
          return target
      }
    }
  },

  /**
   * Questions.
   */
  questions(data) {
    if (!data || !data.data) {
      return []
    }

    var props = [
      'id',
      'type',
      'title',
      'follower_count',
      'answer_count',
      'created'
    ]

    return data.data.map(obj => only(obj, props))
  },

  /**
   * Answers.
   */
  answers(data) {
    if (!data || !data.data) {
      return []
    }

    var props = [
      'id',
      'type',
      'is_normal',
      'voteup_count',
      'collapsed_counts',
      'comment_count',
      'reviewing_comments_count',
      'reshipment_settings',
      'content',
      'created_time',
      'updated_time',
      'mark_infos'
    ]
    var authorProps = refProps.user
    var questionProps = refProps.question

    return data.data.map(obj => {
      var answer = only(obj, props)
      answer.author = only(obj.author, authorProps)
      answer.question = only(obj.question, questionProps)
      return answer
    })
  },

  /**
   * Articles.
   */
  articles(data) {
    if (!data || !data.data) {
      return []
    }

    var props = [
      'id',
      'type',
      'title',
      'content',
      'voteup_count',
      'collapsed_counts',
      'comment_count',
      'reviewing_comments_count',
      'image_url',
      'created',
      'updated'
    ]
    var authorProps = refProps.user

    return data.data.map(obj => {
      var article = only(obj, props)
      article.author = only(obj.author, authorProps)
      return article
    })
  },

  /**
   * Collections.
   */
  collections(data) {
    if (!data || !data.data) {
      return []
    }

    var props = [
      'id',
      'type',
      'title',
      'is_public',
      'answer_count',
      'follower_count',
      'updated_time'
    ]

    return data.data.map(obj => only(obj, props))
  },

  /**
   * Followees and followers.
   */
  follows(data) {
    if (!data || !data.data) {
      return []
    }

    var props = [
      'id',
      'name',
      'type',
      'user_type',
      'url_token',
      'headline',
      'avatar_url',
      'badge'
    ]

    return data.data.map(obj => only(obj, props))
  },

  /**
   * Columns.
   */
  columns(data) {
    if (!data || !data.data) {
      return []
    }

    var props = ['contributions_count']
    var columnProps = [
      'id',
      'type',
      'title',
      'intro',
      'description',
      'image_url',
      'articles_count',
      'followers',
      'updated'
    ]
    var authorProps = refProps.user

    return data.data.map(obj => {
      var ret = only(obj, props)
      ret.column = only(obj.column, columnProps)
      ret.column.author = only(obj.column.author, authorProps)
      return ret
    })
  },

  /**
   * Following columns.
   */
  followingColumns(data) {
    if (!data || !data.data) {
      return []
    }

    var props = [
      'id',
      'type',
      'title',
      'intro',
      'description',
      'image_url',
      'articles_count',
      'followers',
      'updated'
    ]
    var authorProps = refProps.user

    return data.data.map(obj => {
      var column = only(obj, props)
      column.author = only(obj.author, authorProps)
      return column
    })
  },

  /**
   * Following topics.
   */
  followingTopics(data) {
    if (!data || !data.data) {
      return []
    }

    var props = ['contributions_count']
    var topicProps = refProps.topic

    return data.data.map(obj => {
      var ret = only(obj, props)
      ret.topic = only(obj.topic, topicProps)
      return ret
    })
  },

  /**
   * Following questions.
   */
  followingQuestions(data) {
    if (!data || !data.data) {
      return []
    }

    var props = [
      'id',
      'type',
      'title',
      'answer_count',
      'follower_count',
      'created'
    ]

    return data.data.map(obj => only(obj, props))
  }
}
