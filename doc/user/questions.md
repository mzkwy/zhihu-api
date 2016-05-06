# user.questions

```javascript
user.questions([page])
```

Get questions that this user asked. By default, `page` is `1`.

For example:

```javascript
api.user('zhihuadmin').questions()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 30392735,
    qid: 4339443,
    link: 'https://www.zhihu.com/question/30392735',
    title: '如何申请和使用知乎专栏？',
    views: '87K',
    answers: 1,
    follows: 727
}, {
    id: 24039610,
    qid: 1797595,
    link: 'https://www.zhihu.com/question/24039610',
    title: '如果在知乎上发布了不友善内容，帐号可能会被怎样处理？',
    views: '16K',
    answers: 1,
    follows: 73
}, // ... ...
]
```

It's also easy to get all questions that this user asked:

```javascript
var user = api.user('zhihuadmin')
var page = 1

next()

function next() {
    user.questions(page)
        .then(data => {
            if (data.length) {
                handleQuestions(data)
                page++
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
