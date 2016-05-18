# Answer.exploreMonth

```javascript
Answer.exploreMonth([offset])
```

Get hotest answers of this month.

For example;

```javascript
api.answer.exploreMonth()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 98364427,
    aid: 34794483,
    resourceid: 9647721,
    link: 'https://www.zhihu.com/question/43595712/answer/98364427',
    createdtime: 1462104888000,
    agrees: 10388,
    comments: 806,
    content: 'o这玩意简直了，三百多块买过来，崂山神水的咸加这个鱼的咸，完后混合着崂山水的草药味和罐头的巨臭。吃下第一口我直接呕出了中午的饭。关键mb苏打水喝下去会打嗝啊！硬撑着吞下第二口鱼之后崂山神水已经完全喝不出味道了，崂山神水完全是为了像是冲马桶一样把鱼冲下肚子。吞下之后妈蛋打了个嗝啊！一股屎味从食道和气管冲出来顶满了整个头，熏出的眼泪都是屎味的啊！娘嘞现在冲出来换气，路遇邻居疑惑的眼神好像以为我家下水道反水了。罐头扔了，已经没心情照相了<br>———————分割线————<br>题主你提白花蛇草水完全就是在钓鱼在声东击西在搞大新闻！！千算万算也没算到你只是想让我胃里多点气泡！！<br>————————割——————<br>我拉稀了，拉了一晚上，家里的臭味我都不知道是什么发出的了，整整一晚上好像住在城乡结合部的公厕里。你们千万不要吃，自己生死不论还容易被扫地出门，生无可恋(´･_･`) ... ...',
    author: {
        name: '我就明确告诉你',
        uname: 'zhang-teng-42-34',
        link: 'https://www.zhihu.com/people/zhang-teng-42-34'
    },
    question: {
        id: 43595712,
        link: 'https://www.zhihu.com/question/43595712',
        title: '吃瑞典的鲱鱼罐头配崂山白花蛇草水是一种怎样的体验？'
    },
    crawltime: 1463557230614
}, // ... ...
]
```
