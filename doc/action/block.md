# action.block/unblock

```javascript
action.block(uname)
action.unblock(uname)
```

Block or unblock someone.

For example；

```javascript
api.action.block('zhihuadmin')
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: '' }

api.action.unblock('zhihuadmin')
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: '' }
```

