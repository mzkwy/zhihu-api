# question.detail

```javascript
question.detail()
```

Get detail information of this question.

For example:

```javascript
api.question(20395761).detail()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
{
    id: 20395761,
    qid: 338640,
    title: '成长过程中，哪些道理让人懂之恨晚？',
    link: 'https://www.zhihu.com/question/20395761',
    detail: '知道自己想要什么是驱动人生向前的动力，可是大部分人活了几十年年还是不知道，浑浑噩噩的探索着，不知如何选择，也许人生就这样过了。',
    answers: 3735,
    comments: 52,
    followers: 70967,
    visits: 6168536,
    topics: [{
        id: 19550747,
        link: 'https://www.zhihu.com/topic/19550747',
        name: '智慧'
    }, {
        id: 19554859,
        link: 'https://www.zhihu.com/topic/19554859',
        name: '人生'
    }, {
        id: 19554943,
        link: 'https://www.zhihu.com/topic/19554943',
        name: '成长'
    }],
    crawltime: 1462520316245
}
```
