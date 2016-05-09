# action.followQuestion/unfollowQuestion

```javascript
action.followQuestion(qid)
action.unfollowQuestion(qid)
```

Follow or unfollow a question. Note that the parameter is `qid` instead of `id` of the question. You can see that `qid` is different from `id` in [`question.detail`](../question/detail.md).

For example:

```javascript
// https://www.zhihu.com/question/20395761

api.action.followQuestion(338640)
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: null }

api.action.unfollowQuestion(338640)
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: null }
```
