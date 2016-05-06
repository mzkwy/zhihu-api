# api.user

`api.user` is the constructor of `User` class.

The parameter `uname` means *unique name*. For example, if a user's homepage is `https://www.zhihu.com/people/foobar`, then the `uname` is `foobar`.

For example:

```javascript
api.user('foobar')
api.user({ uname: 'foobar' })
```

- [User(uname)](./)
    + [detail()](./detail.md)
    + [profile()](./profile.md)
    + [followers([offset])](./followers.md)
    + [followees([offset])](./followees.md)
    + [latestActivity()](./latestActivity.md)
    + [questions([page])](./questions.md)
    + [answers([page])](./answers.md)
    + [posts([page])](./posts.md)
    + [collections([page])](./collections.md)
    + [topics([offset])](./topics.md)
    + [columns([offset])](./columns.md)
    + [status()](./status.md)

