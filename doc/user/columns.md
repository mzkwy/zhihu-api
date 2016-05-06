# user.columns

```javascript
user.columns([offset])
```

Get columns that this user followed.

For example:

```javascript
api.user('zhihuadmin').columns()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    link: 'http://zhuanlan.zhihu.com/anitama',
    uname: 'anitama',
    avatar: 'https://pic2.zhimg.com/622cab01d742889d39249c04d90828a9_l.png',
    name: 'AnimeTamashii',
    description: '讲道理的动漫媒体。官方微博：@AnimeTamashii 官方网站：http://www.anitama.cn',
    posts: 655
}, {
    link: 'http://zhuanlan.zhihu.com/dechuanmimi',
    uname: 'dechuanmimi',
    avatar: 'https://pic2.zhimg.com/4af13539da75ef276cb0c7b2e652afb9_l.jpg',
    name: '比新闻更美',
    description: '在这里，分享的是我一路所见，比新闻更美的人与事。因为，美比好，更加好。',
    posts: 10
}, // ... ...
]
```

It's also easy to get all columns that this user followed:

```javascript
var user = api.user('zhihuadmin')
var offset = 0

next()

function next() {
    user.columns(offset)
        .then(data => {
            offset += data.length
            if (data.length) {
                handleColumns(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handleColumns(data) {
    // do something
}
```

