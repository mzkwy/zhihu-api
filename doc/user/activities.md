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
    time: 1462351830000,
    type: 'member_create_article'
}, {
    time: 1462257208000,
    type: 'member_answer_question'
}, // ... ...
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
