const only = require('only')

module.exports = {
  /**
   * User detail.
   */
  detail($) {
    return $('#data').data('state')

    // TODO
  },

  /**
   * Activities.
   */
  activities(data) {
    // TODO
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
    var authorProps = [
      'id',
      'name',
      'type',
      'user_type',
      'url_token'
    ]
    var questionProps = [
      'id',
      'type',
      'title'
    ]

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
    var authorProps = [
      'id',
      'name',
      'type',
      'user_type',
      'url_token'
    ]

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
    var authorProps = [
      'id',
      'name',
      'type',
      'user_type',
      'url_token'
    ]

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
    var authorProps = [
      'id',
      'name',
      'type',
      'user_type',
      'url_token'
    ]

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
    var topicProps = [
      'id',
      'type',
      'name'
    ]

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
