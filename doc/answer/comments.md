# answer.comments

```javascript
answer.comments([page])
```

Get comments under this answer.

For example:

```javascript
// https://www.zhihu.com/question/20395761/answer/44292338
api.answer(13111581).comments()
    .then(console.log)
    .catch(console.trace)
```

the result is:

```javascript
{
    comments: [{
        id: 74104760,
        content: "看山还是山呐",
        link: "https://www.zhihu.com/r/answers/13111581/comments/74104760",
        author: {
            name: "窗外",
            uname: "liu-tao-86-67-74",
            link: "http://www.zhihu.com/people/liu-tao-86-67-74",
            avatar: "https://pic4.zhimg.com/1689ccecb01f18230385d1cd2dcc5077_l.jpg",
            meta: {
                isAnswerAuthor: false,
                isQuestionCreator: false
            }
        },
        createdtime: 1428554736000,
        replyto: 0,
        agrees: 62,
        crawltime: 1463540899572
    }, {
        id: 74109997,
        content: "说得很有道理，其实对于这三个我越来越体会到，可是答主很清晰地替我指了出来。现在感觉很清明 :-)",
        link: "https://www.zhihu.com/r/answers/13111581/comments/74109997",
        author: {
            name: "不靠谱小姐",
            uname: "si-si-52-44",
            link: "http://www.zhihu.com/people/si-si-52-44",
            avatar: "https://pic2.zhimg.com/c00b89164df1b053d15242068e57f4f1_l.jpg",
            meta: {
                isAnswerAuthor: false,
                isQuestionCreator: false
            }
        },
        createdtime: 1428557996000,
        replyto: 0,
        agrees: 57,
        crawltime: 1463540899572
    }, // ... ...
    ],
    paging: {
        totalCount: 277,
        perPage: 30,
        currentPage: 1
    }
}
```
