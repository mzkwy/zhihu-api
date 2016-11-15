# Answer.exploreDay

```javascript
Answer.exploreDay([offset])
```

Get today's hotest answers.

For example;

```javascript
api.answer
    .exploreDay()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 101380855,
    aid: 36006069,
    resourceid: 10796050,
    link: 'https://www.zhihu.com/question/46455521/answer/101380855',
    createdtime: 1463513308000,
    agrees: 294,
    comments: 24,
    content: '泻药，感谢震中杯主办方的毛熊脑洞炮，诚意满满，V社真心是欠CIS地区一个Major赛事。用游戏人物来cos西方名画的手法，其创意和匠心都是可圈可点的。<br>让我们先复盘整个视频：<br><br><br><b>首先出场的是宙斯和全能骑士cos的米开朗基罗的《创造亚当》</b><br><img src="https://pic1.zhimg.com/201a4644a5a9da279b773db24dcda214_b.png" data-rawwidth="1366" data-rawheight="768" class="origin_image zh-lightbox-thumb" width="1366" data-original="https://pic1.zhimg.com/201a4644a5a9da279b773db24dcda214_r.png"><img src="https://pic1.zhimg.com/b1ccd17fa3d0b2ce2843dc3fe096a5dc_b.jpg" data-rawwidth="440" data-rawheight="207" class="origin_image zh-lightbox-thumb" width="440" data-original="https://pic1.zhimg.com/b1ccd17fa3d0b2ce2843dc3fe096a5dc_r.jpg"> ... ...',
    author: {
        name: '拉法叶',
        slug: 'Lafayette',
        type: 'people',
        link: 'https://www.zhihu.com/people/Lafayette'
    },
    question: {
        id: 46455521,
        link: 'https://www.zhihu.com/question/46455521',
        title: '如何评价 DOTA2 震中杯的艺术画视频？'
    },
    crawltime: 1463557128993
}, // ... ...
]
```
