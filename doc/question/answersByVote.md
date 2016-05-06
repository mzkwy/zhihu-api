# question.answersByVote

```
question.answersByVote([offset])
```

Get answers by vote. However, it doesn't means answers are sorted by vote count, since *zhihu* has it's own vote weight calculation.

For example:

```javascript
api.question(20395761).answersByVote()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
[{
    id: 44292338,
    aid: 13111581,
    createdtime: 1428553519000,
    agrees: 10257,
    author: {
        name: '磐僧',
        uname: 'pan-seng',
        link: 'https://www.zhihu.com/people/pan-seng'
    },
    resourceid: 338640,
    link: 'https://www.zhihu.com/question/20395761/answer/44292338',
    comments: 272,
    content: '1 人一定要尊重自己真实的感觉，再多大道理也不如感觉来的真实<br><br>不知道大家有没有这种经历，很多时候我们遇到的一些人，他们做事让人觉得都很有道理，但是很多时候就是莫名的让人觉得不舒服。有时候你甚至不明白为什么不舒服。但是如果你有这感觉，时间长了你就会发现你仿佛进入了对方的一种“圈套”，对方不是有意为之，但是确实很让人郁闷，这时候你就明白当时的那种不舒服的感觉是为什么了。对的，感觉不能欺骗人。感觉有时候是不准的，有时候一个情商高的人可以将自己伪装的很好，但更多的时候，我们的直觉和感觉可以告诉我们很多真理，我们无法从逻辑上证明的真理，千万不要忽视感觉。如果一个人大家都说他好，但是你就是认为他不好，千万不要认为自己错了。很可能你真的感觉对了<br>还有一些时候，我们无法理解一些事情，我们总觉得是自己道德不够或者认知不够。很多时候我们都会改变自己的一些“缺点”来迎合一些所谓的普遍的“道德观念”，这也会让自己感觉别扭。不过如果时间久了就会发现，这些观念很多时候是一种洗脑，当初自己才是多么的好，自己已经变得面目全非了，真心后悔啊。所以千万要尊重感觉。<br>传送门：<a href="http://www.zhihu.com/question/29329566/answer/44144979" class="internal">对亲人的生老病死看得很淡，算冷血吗？ - 磐僧的回答</a>  ... ...',
    crawltime: 1462519474564
}, // ... ...
]
```

It's also easy to get all answers of a question by vote:

```javascript
var question = api.question(20395761)
var offset = 0

next()

function next() {
    question.answersByVote(offset)
        .then(data => {
            if (data.length) {
                offset += data.length
                handleAnswers(data)
                next()
            } else {
                console.log('Done!')
            }
        })
        .catch(console.trace)
}

function handleAnswers(data) {
    // do something
}
```
