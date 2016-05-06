# user.latestActivity

```javascript
user.latestActivity()
```

Get the brief infomation of the latest activity.

For example:

```javascript
api.user('zhihuadmin').latestActivity()
    .then(console.log)
    .catch(console.trace)
```

The result is:

```javascript
{
    time: 1462351830000,
    type: 'member_create_article',
    crawltime: 1462505742340
}
```
