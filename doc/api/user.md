# api.user

`api.user` is the constructor of `User` class. The parameter `url_token` is a string. For example, if a user's homepage is `https://www.zhihu.com/people/foobar`, then the `url_token` is `foobar`.

- User(url_token)
  + profile()
  + activities([after_id[, before_id]])
  + questions(offset = 0)
  + answers(offset = 0)
  + articles(offset = 0)
  + collections(offset = 0)
  + followers(offset = 0)
  + followees(offset = 0)
  + columns(offset = 0)
  + followingColumns(offset = 0)
  + followingTopics(offset = 0)
  + followingQuestions(offset = 0)
  + followingCollections(offset = 0)
