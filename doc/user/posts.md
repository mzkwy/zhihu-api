# user.posts

```javascript
user.posts([page])
```

Get this user's posts. By default, `page` is `1`.

For example:

```javascript
api.user('zhihuadmin').posts()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 20819569,
    pid: 510680,
    title: '知乎帐号体系安全性升级啦',
    link: 'http://zhuanlan.zhihu.com/p/20819569',
    agrees: 154,
    comments: 110,
    content: '<p>为了更好地保护大家的帐号，我们最新升级了帐号安全系统：在大家的登录过程中，开启短信二次验证。也就是，当我们发现可疑的登录请求时，系统会自动给你的手机发送短信动态密码。只有提供正确的密码和动态密码，才能登录成功。</p><p>后续，我们还会持续升级，增加异常设备识别和异常登录地识别等，希望最大限度提升大家帐号的安全性，同时优化使用体验。</p><p>最后，如果你在使用中遇到问题，烦请联系 i@zhihu.com，知乎小管家会及时为你提供帮助。</p><br><br><p>常见问题：</p><p>Q：我是邮箱帐号，该怎么办呢？</p><p>A：我们强烈建议你绑定手机号码。此外，如果我们发现你的帐号出现可疑的登录请求，我们也会在你访问知乎的时候，主动引导你进入手机绑定和验证的页面。</p><p>Q：我发现我的帐号被盗了，我该怎么办？</p><p>A：不用担心，你只需要联系 i@zhihu.com ，我们的小管家会问你一些帐号相关的问题，确认了你的身份后，就会为你找回帐号了。</p>',
    crawltime: 1462515833003
}, // ... ...
]
```

It's also easy to get this user's all posts:

```javascript
var user = api.user('zhihuadmin')
var page = 1

next()

function next() {
    user.posts(page)
        .then(data => {
            if (data.length) {
                handlePosts(data)
                page++
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handlePosts(data) {
    // do something
}
```
