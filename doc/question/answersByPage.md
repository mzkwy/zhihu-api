# question.answersByPage

```javascript
question.answersByPage([page])
```

Get answers by page (or time that the answer created and updated in reverse order).

For example:

```javascript
api.question(20395761).answersByPage()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 99217531,
    aid: 35137145,
    createdtime: 1462505791000,
    agrees: 0,
    author: {
        name: '沐烟',
        uname: 'jin-yan-chuang',
        link: 'https://www.zhihu.com/people/jin-yan-chuang'
    },
    resourceid: 338640,
    link: 'https://www.zhihu.com/question/20395761/answer/99217531',
    comments: 0,
    content: '长期缺少行动力，或者说执行力，以及驾驭行动力(执行力)的智慧',
    crawltime: 1462519989215
}, // ... ...
]
```

It's also easy to get all answers of a question by page:

```javascript
var question = api.question(20395761)
var page = 1

next()

function next() {
    question.answersByPage(page)
        .then(data => {
            if (data.length) {
                page++
                handleAnswers(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handleAnswers(data) {
    // do something
}
```
