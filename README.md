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
const api = require('zhihu-api')()

// cookie must be set before any request
api.cookie(fs.readFileSync('./cookie'))

api.user('zhihuadmin')
    .profile()
    .then(console.log)
    .catch(console.trace)
```

which outputs:

```javascript
{
    "id": "3d198a56310c02c4a83efb9f4a4c027e",
    "name": "知乎小管家",
    "type": "people",
    "userType": "people",
    "urlToken": "zhihuadmin",
    "gender": 0,
    "messageThreadToken": "6479654600",
    "avatarUrl": "https://pic3.zhimg.com/34bf96bf5584ac4b5264bd7ed4fdbc5a_is.jpg",
    "coverUrl": "",
    "headline": "欢迎反馈问题和建议！",
    "description": "",
    "isBindSina": true,
    "showSinaWeibo": true,
    "sinaWeiboUrl": "http://weibo.com/u/5192295756",
    "badge": [{
        "type": "identity",
        "description": "知乎官方帐号"
    }],
    "followerCount": 47741,
    "followingCount": 4,
    "questionCount": 7,
    "answerCount": 49,
    "articlesCount": 26,
    "markedAnswersCount": 0,
    "markedAnswersText": "",
    "followingTopicCount": 8,
    "followingQuestionCount": 90,
    "followingColumnsCount": 0,
    "followingFavlistsCount": 0,
    "favoriteCount": 0,
    "favoritedCount": 3711,
    "thankedCount": 3871,
    "hostedLiveCount": 0,
    "participatedLiveCount": 0,
    "logsCount": 84,
    "voteupCount": 77180,
    "accountStatus": [],
    "isForceRenamed": false,
    "isActive": 1,
    "business": {
        "id": "19550517",
        "type": "topic",
        "name": "互联网"
    },
    "locations": [{
        "id": "19550828",
        "type": "topic",
        "name": "北京"
    }],
    "educations": [],
    "employments": [{
        "company": {
            "id": "19550228",
            "type": "topic",
            "name": "知乎"
        },
        "job": {
            "id": "19625808",
            "type": "topic",
            "name": "社区管理"
        }
    }]
}
```

### License

[MIT](./LICENSE)
