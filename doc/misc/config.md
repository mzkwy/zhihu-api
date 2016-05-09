# api._config

`api._config` is a reference to internal module `config`.

### config.setCookie(cookie)

Set `Cookie` header for requests. In fact, `api.cookie(cookie)` calls `config.setCookie(cookie)`.

### config.setUserAgent(userAgent)

Set `User-Agent` header for requests.

### config.headers

It stores headers that used to accomplish all requests, including `User-Agent` and `Cookie`.

### config.data

It stores some internal data. Now only `xsrf`.
