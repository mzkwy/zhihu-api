# user/org.topics

```javascript
user/org.topics([offset])
```

Get topics that this user followed.

For example:

```javascript
api.user('zhihuadmin')
    .topics()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 19550235,
    tid: 6,
    link: 'https://www.zhihu.com/topic/19550235',
    avatar: 'https://pic2.zhimg.com/772ba74f5_xs.jpg',
    name: '知乎指南'
}, {
    id: 19550887,
    tid: 220,
    link: 'https://www.zhihu.com/topic/19550887',
    avatar: 'https://pic1.zhimg.com/2e33f063f1bd9221df967219167b5de0_xs.jpg',
    name: '知乎社区'
}, // ... ...
]
```

It's also easy to get all topics that this user followed:

```javascript
var user = api.user('zhihuadmin')
var offset = 0

next()

function next() {
    user.topics(offset)
        .then(data => {
            if (data.length) {
                offset += data.length
                handleTopics(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handleTopics(data) {
    // do something
}
```

