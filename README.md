# zhihu API

[![node](https://img.shields.io/node/v/zhihu-api.svg)](https://nodejs.org/en/)
[![npm](https://img.shields.io/npm/v/zhihu-api.svg)](https://www.npmjs.com/package/zhihu-api)
[![npm](https://img.shields.io/npm/dt/zhihu-api.svg)](https://www.npmjs.com/package/zhihu-api)
[![Travis](https://img.shields.io/travis/syaning/zhihu-api.svg)](https://travis-ci.org/syaning/zhihu-api)

**UNOFFICIAL** API for [zhihu](https://www.zhihu.com).

This projects implements only basic data interfaces, meaning that you should implement your own logical code (by using this project) if you want a crawler/spider.

See [doc](http://syaning.com/zhihu-api/index.html).

### Install

```sh
$ npm install zhihu-api
```

### Quick Start

```javascript
const fs = require('fs')
const api = require('zhihu-api')

// cookie must be set before any request
api.cookie(fs.readFileSync('./cookie'))

api.user('zhihuadmin')
    .detail()
    .then(console.log)
    .catch(console.trace)
```

which outputs:

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

### License

[MIT](./LICENSE)
