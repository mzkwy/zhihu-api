# user.followees

```javascript
user.followees([offset])
```

Get a page of (at most 20) followees with given `offset`. It will get the first page if `offset` is not specified.

For example:

```javascript
api.user('zhihuadmin').followees()
    .then(console.log)
    .catch(console.trace)
```

The result is:

```javascript
[{
    name: '黄继新',
    uname: 'jixin',
    link: 'https://www.zhihu.com/people/jixin',
    hash: 'b6f80220378c8b0b78175dd6a0b9c680',
    avatar: 'https://pic2.zhimg.com/0626f4164009f291b26a79d96c6962c5_m.jpg'
}, {
    name: '李申申',
    uname: 'shen',
    link: 'https://www.zhihu.com/people/shen',
    hash: '59d41f04964870e9a874783d64373d68',
    avatar: 'https://pic2.zhimg.com/e14d48805_m.jpg'
}, {
    name: '周源',
    uname: 'zhouyuan',
    link: 'https://www.zhihu.com/people/zhouyuan',
    hash: '6733f12c60e7e98ea7491f20de46f79e',
    avatar: 'https://pic2.zhimg.com/eb64aa88daef788fe6cc080bd771482d_m.jpg'
}]
```

It's also easy to get all followees:

```javascript
var user = api.user('zhihuadmin')
var offset = 0

next()

function next() {
    user.followees(offset)
        .then(data => {
            offset += data.length
            if (data.length) {
                handleFollowees(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.log)
}

function handleFollowees(data) {
    // do something
}
```
