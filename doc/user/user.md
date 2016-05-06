# api.user

```javascript
api.user(uname)
```

`api.user` is the constructor of `User` class.

The parameter `uname` means *unique name*. For example, if a user's homepage is `https://www.zhihu.com/people/foobar`, then the `uname` is `foobar`.

For example:

```javascript
api.user('foobar')
api.user({ uname: 'foobar' })
```
