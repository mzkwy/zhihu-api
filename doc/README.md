# zhihu API

<a class="github-button" href="https://github.com/syaning/zhihu-api" data-icon="octicon-star" data-count-href="/syaning/zhihu-api/stargazers" data-count-api="/repos/syaning/zhihu-api#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star syaning/zhihu-api on GitHub">Star</a>

<a class="github-button" href="https://github.com/syaning/zhihu-api/fork" data-icon="octicon-repo-forked" data-count-href="/syaning/zhihu-api/network" data-count-api="/repos/syaning/zhihu-api#forks_count" data-count-aria-label="# forks on GitHub" aria-label="Fork syaning/zhihu-api on GitHub">Fork</a>

<a class="github-button" href="https://github.com/syaning" data-count-href="/syaning/followers" data-count-api="/users/syaning#followers" data-count-aria-label="# followers on GitHub" aria-label="Follow @syaning on GitHub">Follow @syaning</a>

<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>

This is just an **UNOFFICIAL** project, aiming to provide basic data interface for data crawling and further research.

### Install

```
$ npm install zhihu-api --save
```

### Usage

To request data, you must specify your cookie to simulate login. All data interfaces return a Promise.

For example:

```javascript
const fs = require('fs')
const api = require('zhihu-api')

api.cookie(fs.readFileSync('./cookie'))

api.user('zhihuadmin')
    .detail()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
{
    name: '知乎小管家',
    slug: 'zhihuadmin',
    link: 'https://www.zhihu.com/people/zhihuadmin',
    biology: '欢迎反馈问题和建议！',
    weibo: 'http://weibo.com/zhihuadmin',
    avatar: 'https://pic3.zhimg.com/34bf96bf5584ac4b5264bd7ed4fdbc5a_l.jpg',
    location: '北京',
    business: '互联网',
    gender: 'female',
    company: '知乎',
    position: '社区管理',
    school: '',
    major: '',
    description: '',
    hash: '3d198a56310c02c4a83efb9f4a4c027e',
    agrees: 52454,
    thanks: 2889,
    asks: 3,
    answers: 40,
    posts: 12,
    collections: 0,
    logs: 65,
    followees: 3,
    followers: 29922,
    crawltime: 1462432965675
}
```

