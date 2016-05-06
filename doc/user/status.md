# user.status

```javascript
user.status()
```

Get the current status of given user.

For example:

```javascript
api.user('zhihuadmin').status()
    .then(console.log)
    .catch(console.trace)
// { status: 'normal', crawltime: 1462517366477 }

api.user('fei-niao-bing-he').status()
    .then(console.log)
    .catch(console.trace)
// { status: '由于严重违反知乎社区规范，该用户帐号已被停用。', crawltime: 1462517393335 }
```
