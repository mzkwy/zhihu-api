# api.cookie

```javascript
api.cookie() // get cookie
api.cookie(cookie) // set cookie
```

Get or set cookie. You must specify a cookie to use all the interfaces, or you may get nothing. The parameter `cookie` may be a Buffer or string.

For example:

```javascript
const fs = require('fs')
const api = require('zhihu-api')

api.cookie(fs.readFileSync('./cookie'))
```

