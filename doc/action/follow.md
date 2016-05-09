# action.follow/unfollow

```javascript
action.follow(uname)
action.unfollow(uname)
```

Follow or unfollow a user.

For example:

```javascript
api.action.follow('zhihuadmin')
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: null }

api.action.unfollow('zhihuadmin')
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: null }
```

