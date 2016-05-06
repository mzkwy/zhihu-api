# user.answers

```javascript
user.answers([page])
```

Get answers that this user answered. By default, `page` is `1`.

For example:

```javascript
api.user('zhihuadmin').answers()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 95071272,
    aid: 33470778,
    resourceid: 13165,
    link: 'https://www.zhihu.com/question/19582972/answer/95071272',
    createdtime: 1460527040000,
    agrees: 8,
    comments: 3,
    content: '本问题隶属于「知乎官方指南」：<a href="http://www.zhihu.com/question/19581624" class="internal">属于「知乎官方指南」的问答有哪些？</a><br>--<br>知乎官方支持 iOS 和 Android 客户端下载，可点击此页面安装：<a href="http://www.zhihu.com/app/" class="internal">知乎客户端</a><br>知乎日报支持 iOS 和 Android 客户端下载，可点击此页面安装：<a href="http://daily.zhihu.com/" class="internal">知乎日报</a><br><br>在知乎客户端，你可以：<br><ul><li>直接在手机上提问、回答、评论</li><li>方便地创建和分享真实优质的知识、经验和见解</li><li>搜索你感兴趣的问答、话题和用户</li><li>结识志同道合的好友<br></li><li>分享优质讨论到微博、微信</li></ul>而知乎日报，你可以：<br><ul><li>看到新闻背后的逻辑，从另一个角度认识传统新闻<br></li><li>从众多主题日报中发现由业内人推荐的优质文章<br></li><li>千万高质量读者，在财经设计电影互联网游戏动漫等众多领域实时探讨</li></ul>',
    author: {
        name: '知乎小管家',
        uname: 'zhihuadmin',
        link: 'https://www.zhihu.com/people/zhihuadmin'
    },
    question: {
        id: 19582972,
        title: '知乎有没有针对 iPhone 、 Android 等手机的客户端或 Wap 版？',
        link: 'https://www.zhihu.com/question/19582972'
    },
    crawltime: 1462514957075
}, // ... ...
]
```

It's also easy to get all answers that this user answered:

```javascript
var user = api.user('zhihuadmin')
var page = 1

next()

function next() {
    user.answers(page)
        .then(data => {
            if (data.length) {
                handleAnswers(data)
                page++
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
