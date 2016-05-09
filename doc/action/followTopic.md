# action.followTopic/unfollowTopic

```javascript
action.followTopic(tid)
action.unfollowTopic(tid)
```

Follow or unfollow a topic. Note that the parameter is `tid` instead of `id` of the topic. You can see that `tid` is different from `id` in [`topic.hierarchy`](../topic/hierarchy.md).

For example:

```javascript
// tid 68 is the topic '电影'
// https://www.zhihu.com/topic/19550429

api.action.followTopic(68)
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: null }

api.action.unfollowTopic(68)
    .then(console.log)
    .catch(console.trace)
// { r: 0, msg: null }
```

