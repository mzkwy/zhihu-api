# topic.topAnswers

```javascript
topic.topAnswers([page])
```

Get top answers (or 精华) under this topic. By default, `page` is `1`.

For example:

```javascript
api.topic(19550429).topAnswers()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 61498512,
    aid: 20012017,
    agrees: 83911,
    resourceid: 6208867,
    link: 'https://www.zhihu.com/question/35005800/answer/61498512',
    content: '85K收藏，赞同才36K，你们这。。。。。。。。<br>-<br><b>声明，如果有微博或者公众号发表了我的这篇回答，请一定要把链接私信给我。我将会跟官方沟通维护我的权益。具体转载事项请看文尾。</b><br>---------------<br>-<br><br>这个问题我回答是最合适不过了！十个电影，每个电影都能让你知道自己年轻应该是怎么样的一种状态！<br><br>-<br><br>第一个首推《白日梦想家》，一生推。<br><img src="https://pic4.zhimg.com/68fce24ebb7205dccf864db2a54a77bf_b.png" data-rawwidth="405" data-rawheight="600" class="content_image" width="405"> ... ...',
    author: {
        name: 'Jee Xin',
        uname: 'li-xin-79-4-57',
        link: 'https://www.zhihu.com/people/li-xin-79-4-57'
    },
    question: {
        id: 35005800,
        link: 'https://www.zhihu.com/question/35005800',
        title: '想要充实自己，有哪 10 本书和 10 部电影值得推荐？'
    },
    score: 1,
    comments: 1593,
    crawltime: 1462628122416
}, // ... ...
]
```

It's also easy to get all top answers under this topic:

```javascript
var topic = api.topic(19550429)
var page = 1

next()

function next() {
    topic.topAnswers(page)
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
