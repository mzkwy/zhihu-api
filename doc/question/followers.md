# question.followers

```javascript
question.followers([offset])
```

Get users that followed this question.

For example:

```javascript
api.question(20395761).followers()
    .then(console.log)
    .catch(console.trace)
```

the reuslt is:

```javascript
[{
    name: '黄小君',
    uname: 'huang-xiao-jun-90',
    link: 'https://www.zhihu.com/people/huang-xiao-jun-90',
    hash: '51ddb1402cf02b8fcda1fa6109b4f0f1',
    avatar: 'https://pic4.zhimg.com/d1f3fa4b3_m.jpg'
}, {
    name: 'Sophie呀',
    uname: 'lian-jie-32',
    link: 'https://www.zhihu.com/people/lian-jie-32',
    hash: '97d63291c7fbac346d2864bc953979c7',
    avatar: 'https://pic3.zhimg.com/5735a731dcc4fa0f90f6679765447392_m.jpg'
}, // ... ...
]
```

It's also easy to get all followers of this question:

```javascript
var question = api.question(20395761)
var offset = 0

next()

function next() {
    question.followers(offset)
        .then(data => {
            if (data.length) {
                offset += data.length
                handleFollowers(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handleFollowers(data) {
    // do something
}
```
