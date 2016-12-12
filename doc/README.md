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
const api = require('zhihu-api')()

api.cookie(fs.readFileSync('./cookie'))

api.user('zhihuadmin')
    .profile()
    .then(console.log)
    .catch(console.trace)
```

the result is:

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
