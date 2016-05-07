# topic.newAnswers

```javascript
topic.newAnswers([offset])
```

Get new answers (or 动态 - 时间排序) under this topic. The parameter `offset` is the answer score or an empty string if it is not specified.

For example:

```javascript
api.topic(19550429).newAnswers()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 99499928,
    aid: 35250552,
    agrees: 0,
    resourceid: 8702481,
    link: 'https://www.zhihu.com/question/41237992/answer/99499928',
    content: '一<br>电视剧则是中国的特有的说法，在其他国家，电视剧被成为电视小说，电视故事片，电视戏剧等等。但是不管称呼怎么变，很显然，电视剧首先是属于戏剧范畴的一种演剧形式。<br><br>既然是戏剧的变种，那么评价一部电视剧最基本的就应该从戏剧的几个基本要素出发去看。<br><br>亚里士多德很早的时候就将悲剧概括为”<b>对一个严肃、完整、有一定长度的行动的摹仿。”</b><br><br><br> ... ...',
    author: {
        name: '由葭',
        uname: 'you-jia-71-36',
        link: 'https://www.zhihu.com/people/you-jia-71-36'
    },
    question: {
        id: 41237992,
        link: 'https://www.zhihu.com/question/41237992',
        title: '如何评价电视剧《欢乐颂》？'
    },
    score: '1462629288.0',
    comments: 0,
    crawltime: 1462629304823
}, // ... ...
]
```

It's also easy to get all new answers under this topic:

```javascript
var topic = api.topic(19550429)
var offset = ''

next()

function next() {
    topic.newAnswers(offset)
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

