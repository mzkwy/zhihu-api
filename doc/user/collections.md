# user.collection

```javascript
user.collection([page])
```

Get this user's collections. By default, `page` is `1`.

For example:

```javascript
api.user('renfish').collections()
    .then(console.log)
    .catch(console.trace)
```

the reuslt is:

```javascript
[{
    name: '知识与数据',
    id: 97755231,
    fvid: 882631,
    link: 'https://www.zhihu.com/collection/97755231',
    answers: 3,
    followers: 0,
    crawltime: 1462516233659
}, {
    name: '男生也曝照',
    id: 93912875,
    fvid: 345849,
    link: 'https://www.zhihu.com/collection/93912875',
    answers: 9,
    followers: 1,
    crawltime: 1462516233659
}, // ... ...
]
```

It's also easy to get this user's all collections:

```javascript
var user = api.user('renfish')
var page = 1

next()

function next() {
    user.collections(page)
        .then(data => {
            if (data.length) {
                page++
                handleCollections(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handleCollections(data) {
    // do something
}
```
