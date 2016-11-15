# user/org.profile

```javascript
user/org.profile()
```

Return profile of this user.

For example:

```javascript
api.user('zhihuadmin')
    .profile()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
{
    name: '知乎小管家',
    slug: 'zhihuadmin',
    type: 'people',
    link: 'https://www.zhihu.com/people/zhihuadmin',
    avatar: 'https://pic3.zhimg.com/34bf96bf5584ac4b5264bd7ed4fdbc5a_xs.jpg',
    gender: 'female',
    biology: '欢迎反馈问题和建议！',
    answers: '40',
    posts: '12',
    followers: '30K',
    hash: '3d198a56310c02c4a83efb9f4a4c027e',
    crawltime: 1462434596358
}
```

> **Note:** `answers`, `posts` and `followers` in the result of `user.detail` are all numbers, while `user.profile` return these values as strings. That's why `followers` is `30K` in the snippet above.
