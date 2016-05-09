# action.voteUp/voteNeutral/voteDown

```javascript
action.voteUp(aid)
action.voteNeutral(aid)
action.voteDown(aid)
```

Vote for an answer. Note that the parameter is `aid` instead of `id` of an answer. You can see that `aid` is different from `id` in [`question.answersByVote`](../question/answersByVote.md) or [`topic.hotAnswers`](../topic/hotAnswers.md).

For example:

```javascript
// https://www.zhihu.com/question/20395761/answer/44292338

api.action.voteUp(13111581)
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: null }

api.action.voteDown(13111581)
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: null }

api.action.voteNeutral(13111581)
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: null }
```

