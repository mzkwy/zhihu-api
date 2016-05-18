# topic.followers

```javascript
topic.followers([start[, offset]])
```

Get users that followed this topic. The param `start` is a timestamp in seconds.

For example:

```javascript
api.topic(19550429).followers()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    name: '成住坏空',
    uname: 'cheng-zhu-pi-kong',
    link: 'https://www.zhihu.com/people/cheng-zhu-pi-kong',
    avatar: 'https://pic3.zhimg.com/1b45c0748b6ae07dc154878047973016_m.jpg',
    hash: '4b929d1b35b70fe45f78cb1067778609',
    followtime: 1462625164000
}, {
    name: '易栀',
    uname: 'yi-zhi-66-78',
    link: 'https://www.zhihu.com/people/yi-zhi-66-78',
    avatar: 'https://pic1.zhimg.com/79924d6bda33fef7389a66fde2e252fc_m.jpg',
    hash: 'd8066b156213739f1b26fa89ff5a113c',
    followtime: 1462625162000
}, // ... ...
]
```

It's also easy to get all followers of the topic:

```javascript
var topic = api.topic(19550429)
var start = ''
var offset = 0

next()

function next() {
    topic.followers(start, offset)
        .then(data => {
            if (data.length) {
                start = data[data.length - 1].followtime / 1000
                offset += data.length
                handleFollowers(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handleFollowers(data) {
    // do something
}
```

