# user.followers

```javascript
user.followers([offset])
```

Get a page of (at most 20) followers with given `offset`. It will get the first page if `offset` is not specified.

For example:

```javascript
api.user('zhihuadmin').followers()
    .then(console.log)
    .catch(console.trace)
```

The result is:

```javascript
[{
    name: '路口',
    uname: 'lu-kou-5',
    link: 'https://www.zhihu.com/people/lu-kou-5',
    hash: '88430513e6ee08970c269acd8080373c',
    avatar: 'https://pic3.zhimg.com/1fb8fc352_m.jpg'
}, {
    name: '辛鹏',
    uname: 'xin-peng-36',
    link: 'https://www.zhihu.com/people/xin-peng-36',
    hash: 'a913ab15c396d5c0d5d86a64ed8a55f9',
    avatar: 'https://pic1.zhimg.com/da8e974dc_m.jpg'
}, // ... ...
]
```

It's also easy to get all followers:

```javascript
var user = api.user('zhihuadmin')
var offset = 0

next()

function next() {
    user.followers(offset)
        .then(data => {
            offset += data.length
            if (data.length) {
                handleFollowers(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.log)
}

function handleFollowers(data) {
    // do something
}
```
