# User

```javascript
api.user(uname)
```

`api.user` is the constructor of `User` class. `api.user(uname)` can construct a `User` instance.

The parameter `uname` means *unique name*. For example, if a user's homepage is `https://www.zhihu.com/people/foobar`, then the `uname` is `foobar`.

### Example

```javascript
api.user('foobar')
api.user({ uname: 'foobar' })
```
