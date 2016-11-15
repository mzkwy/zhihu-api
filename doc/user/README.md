# api.user

`api.user` is the constructor of `User` class, `api.org` is the constructor of `Org` class.

The parameter `slug` is a string. For example, if a user's homepage is `https://www.zhihu.com/people/foobar`, then the `slug` is `foobar`. `slug` could also be an object that has a `slug` property, for example, `{ slug: 'foobar' }`.

For example:

```javascript
api.user('foobar')
api.org({ slug: 'foobar' })
```

- [User(slug)](./)
    + [detail()](./detail.md)
    + [profile()](./profile.md)
    + [followers([offset])](./followers.md)
    + [followees([offset])](./followees.md)
    + [activities([start])](./activities.md)
    + [questions([page])](./questions.md)
    + [answers([page])](./answers.md)
    + [posts([page])](./posts.md)
    + [collections([page])](./collections.md)
    + [topics([offset])](./topics.md)
    + [columns([offset])](./columns.md)
- [Org(slug)](./)
    + [detail()](./detail.md)
    + [profile()](./profile.md)
    + [followers([offset])](./followers.md)
    + [followees([offset])](./followees.md)
    + [activities([start])](./activities.md)
    + [questions([page])](./questions.md)
    + [answers([page])](./answers.md)
    + [posts([page])](./posts.md)
    + [topics([offset])](./topics.md)
    + [columns([offset])](./columns.md)

