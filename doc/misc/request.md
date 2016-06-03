# api._request

`api._request` is a reference to internal module `request`. `config.headers` will be used for all requests.

### request(url)

Send a `GET` request.

### request(url, data)

Send a `POST` request.

### request.xsrf()

Get `xsrf`. If `config.xsrf` already exists, just resolve it, or a request will be sent.
