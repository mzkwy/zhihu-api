# topic.hierarchy

```javascript
topic.hierarchy()
```

Get the hierarchy information of given topic.

For example:

```javascript
api.topic(19550429)
    .hierarchy()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
{
    id: 19550429,
    tid: 68,
    link: 'https://www.zhihu.com/topic/19550429',
    name: '电影',
    avatar: 'https://pic4.zhimg.com/7d8c15df29ce6900c80f9cf630992687_m.jpg',
    followers: 7299755,
    parents: [{
        id: 19554706,
        tid: 1497,
        name: '影视',
        link: 'https://www.zhihu.com/topic/19554706'
    }, {
        id: 19550434,
        tid: 69,
        name: '艺术',
        link: 'https://www.zhihu.com/topic/19550434'
    }],
    children: [{
        id: 19969488,
        tid: 141849,
        name: '电影花絮',
        link: 'https://www.zhihu.com/topic/19969488'
    }, {
        id: 19556784,
        tid: 2191,
        name: '电影推荐',
        link: 'https://www.zhihu.com/topic/19556784'
    }, // ... ...
    ],
    crawltime: 1462624774924
}
```
