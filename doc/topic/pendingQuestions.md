# topic.pendingQuestions

```javascript
topic.pendingQuestions([page])
```

Get pending questions (or 等待回答 - 全部问题) under this topic.

For example:

```javascript
api.topic(19550429)
    .pendingQuestions()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 45688435,
    qid: 10487827,
    link: 'https://www.zhihu.com/question/45688435',
    title: '看恐怖片真的能减肥嘛？',
    answers: 0,
    followers: 1,
    crawltime: 1462633250378
}, {
    id: 45688431,
    qid: 10487826,
    link: 'https://www.zhihu.com/question/45688431',
    title: '对美队3的这种评论有道理吗？',
    answers: 0,
    followers: 1,
    crawltime: 1462633250379
}, // ... ...
]
```

It's also easy to get all pending questions under this topic:

```javascript
var topic = api.topic(19550429)
var page = 1

next()

function next() {
    topic.pendingQuestions(page)
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
