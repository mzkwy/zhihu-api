# user.activities

```javascript
user.activities([start])
```

Get user's activities. The parameter `start` is a timestamp in seconds.

For example:

```javascript
api.user('zhihuadmin').activities()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    time: 1464404389000,
    type: "member_create_article",
    post: {
        id: 21255045,
        pid: 685785,
        title: '知乎安全防护全面升级',
        link: 'http://zhuanlan.zhihu.com/p/21255045',
        agrees: 801,
        comments: 97,
        content: '...'
    },
    crawltime: 1465562320533
}, {
    time: 1463887639000,
    type: 'member_answer_question',
    answer: {
        id: 102022417,
        aid: 36264526,
        resourceid: 12594,
        link: 'https://www.zhihu.com/question/19581512/answer/102022417',
        createdtime: 1463887639000,
        agrees: 14,
        comments: 8,
        content: '',
        author: {
            name: '知乎小管家',
            uname: 'zhihuadmin',
            link: 'https://www.zhihu.com/people/zhihuadmin'
        },
        question: {
            id: 19581512,
            title: '如何正确使用知乎的「赞同、反对、感谢、没有帮助」功能？',
            link: 'https://www.zhihu.com/question/19581512'
        }
    },
    crawltime: 1465562320536
}, // ...
]

```

It's also easy to get all activities of a user:

```javascript
var user = api.user('zhihuadmin')
var start = undefined

next()

function next() {
    user.activities(start)
        .then(data => {
            if (data.length) {
                start = data[data.length - 1].time / 1000
                handleActivities(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handleActivities(data) {
    // do something
}
```
