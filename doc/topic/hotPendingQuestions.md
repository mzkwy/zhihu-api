# topic.hotPendingQuestions

```javascript
topic.hotPendingQuestions([page])
```

Get hot pending questions (or 等待回答 - 热门问题) under this topic.

For example:

```javascript
api.topic(19550429).hotPendingQuestions()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 21619183,
    qid: 828392,
    link: 'https://www.zhihu.com/question/21619183',
    title: '为什么大陆电影院放映原声电影的字幕要使用标楷体？',
    answers: 0,
    followers: 149,
    crawltime: 1462633663351
}, {
    id: 21422909,
    qid: 749887,
    link: 'https://www.zhihu.com/question/21422909',
    title: '写动画评论如何入门？',
    answers: 0,
    followers: 191,
    crawltime: 1462633663352
}, // ... ...
]
```

It's also easy to get all hot pending questions under this topic:

```javascript
var topic = api.topic(19550429)
var page = 1

next()

function next() {
    topic.hotPendingQuestions(page)
        .then(data => {
            if (data.length) {
                page++
                handleQuestions(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handleQuestions(data) {
    // do something
}
```
