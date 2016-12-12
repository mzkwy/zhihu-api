const zhimg = require('zhimg')

module.exports = function(req) {
  /**
   * Initialize an `Image`.
   *
   * @param {String} src
   */
  function Image(src) {
    if (!(this instanceof Image)) {
      return new Image(src)
    }

    this._img = zhimg(src)
    this.src = src
  }

  // default directory and size
  Image.dir = process.cwd()
  Image.size = ''

  Image.prototype._req = req
  Object.assign(Image.prototype, proto)

  return Image
}

var proto = {
  /**
   * Download image.
   *
   * @param  {Object} opts
   * @param  {String} opts.dir
   * @param  {String} opts.size
   * @param  {String} opts.filename
   * @return {Promise}
   * @public
   */
  download(opts) {
    var Ctor = this.constructor
    opts = Object.assign({
      dir: Ctor.dir,
      size: Ctor.size
    }, opts)

    var src = opts.size ? this._img.size(opts.size) : this.src
    var filename = opts.filename || src.substr(src.lastIndexOf('/') + 1)

    return this._req.download({
      src,
      filename,
      dir: opts.dir
    })
  }
}
