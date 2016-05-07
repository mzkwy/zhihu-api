# topic.hotAnswers

```javascript
topic.hotAnswers([offset])
```

Get hot answers (or 动态 - 热门排序) under this topic. The parameter `offset` is the answer score or an empty string if it is not specified.

For example:

```javascript
api.topic(19550429).hotAnswers()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 32793052,
    aid: 8503676,
    agrees: 4048,
    resourceid: 2759936,
    link: 'https://www.zhihu.com/question/26442667/answer/32793052',
    content: '<p>上周，漫威本来打算用来重磅出击的《复仇者联盟：奥创时代》的首款预告片被“九头蛇”提前泄了密，从确定片名到发布首款预告片，持续一年多的发酵过程中，漫迷和影迷对于这部片子的期望逐渐累积，终于在预告片发出的那一时刻得到了迸发。而迪士尼和漫威还觉得不够过瘾，就在这周三又紧接着发布了第三阶段的十部电影的档期安排，以《复仇者联盟：无限战争（下）》作为结束，一直持续到2019年。</p><p>其实本来复联二的预告片的火爆刚刚过去，看到了漫威发布接下来十部电影档期的新闻，又把我的兴奋劲儿给续上了，到了周末终于有时间歇一歇了，下面借着这个激动的劲头把这十部电影给大家捋一捋，顺道再把同样持有漫威部分英雄版权的Sony与Fox的排片计划也捋一捋，数数好像是有二十几部呢，可能会越捋越激动呢....</p><p>没看过复联二预告的，先甩链接<a href="//link.zhihu.com/?target=http%3A//v.youku.com/v_show/id_XODEzODYwNzM2.html%3FX" class=" wrap external" target="_blank" rel="nofollow noreferrer">《复仇者联盟：奥创纪元》完全版预告片<i class="icon-external"></i></a> ... ...',
    author: {
        name: '刘偲毅',
        uname: 'liu-cai-yi',
        link: 'https://www.zhihu.com/people/liu-cai-yi'
    },
    question: {
        id: 26442667,
        link: 'https://www.zhihu.com/question/26442667',
        title: '观看漫威电影时需要有哪些知识储备？'
    },
    score: 2909.94404068,
    comments: 184,
    crawltime: 1462628901461
}, // ... ...
]
```

It's also easy to get all hot answers under this topic:

```javascript
var topic = api.topic(19550429)
var offset = ''

next()

function next() {
    topic.hotAnswers(offset)
        .then(data => {
            if (data.length) {
                offset = data[data.length - 1].score
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
