# answer.voters

```javascript
answer.voters([next])
```

Get users that voted for this answer. The parameter should be an URL string or none.

For example:

```javascript
// https://www.zhihu.com/question/20395761/answer/44292338
api.answer(13111581)
    .voters()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
{
    voters: [{
        name: '梁边妖',
        slug: 'liangbianyao',
        type: 'people',
        link: 'https://www.zhihu.com/people/liangbianyao',
        hash: '48ddfa526720c3ada296462afb5d564b',
        avatar: 'https://pic3.zhimg.com/e890b7eba_m.jpg'
    }, {
        name: '王有刚',
        slug: 'wang-you-gang',
        type: 'people',
        link: 'https://www.zhihu.com/people/wang-you-gang',
        hash: '0bf89713587eaadbbff1a56ef3aa85cb',
        avatar: 'https://pic3.zhimg.com/a5ff25e86_m.jpg'
    }, // ... ...
    ],
    total: 10338,
    next: 'https://www.zhihu.com/answer/13111581/voters_profile?total=10338&offset=10&follows=gYH3d9JfIFNkY80etL6A8iYcS77jX4ny',
    crawltime: 1462774064873
}
```

It's also easy to get all users that voted for this answer:

```javascript
var answer = api.answer(13111581)
var nextUrl = ''

next()

function next() {
    answer.voters(nextUrl)
        .then(data => {
            if (data.next) {
                nextUrl = data.next
                handleVoters(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handleVoters(data) {
    // do something
}
```

