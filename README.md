# Zhihu API

**UNOFFICIAL** API for [zhihu](https://www.zhihu.com).

This projects implements only basic data APIs, meaning that you should implement your own logical code (by using this project) if you want a crawler/spider.

### Install

```
npm install zhihu-api --save
```

### Usage

```javascript
const api = require('../zhihu-api')('./cookie')
// You MUST specify a file in which your cookie is stored

api.user.detail('excited-vczh')
    .then(console.log.bind(console))
    .catch(console.trace.bind(console))
```

which outputs:

```javascript
{
    name: 'vczh',
    link: '/people/excited-vczh',
    biology: '专业造轮子，前排已拉黑。gaclib.net',
    weibo: 'http://weibo.com/vczh',
    // ... ...
}
```

### Example

The following example implements a quite simple crawler which crawls all followees of given account.

```javascript
const api = require('zhihu-api')('./cookie')

var offset = 0
var idx = 0

function getFollowees(profile) {
    api.user.followees(profile, offset)
        .then(followees => {
            offset += followees.length

            fs.writeFile(++idx + '.json', JSON.stringify(followees), function(err) {
                if (err) {
                    console.log('write file', idx, 'error')
                } else {
                    console.log('write file', idx)
                }
            })

            if (followees.length) {
                setTimeout(function() {
                    getFollowees(profile)
                }, 1000)
            }
        })
}

api.user.profilecard('excited-vczh')
    .then(getFollowees)
```

### API

TODO

### License

[WTFPL](http://www.wtfpl.net/)
