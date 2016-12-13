const parser = require('../parser/collection')
const baseurl = require('../urls').baseurl

module.exports = function(req) {
  /**
   * Initialize a `Collection`.
   *
   * @param {Number} id
   * @public
   */
  function Collection(id) {
    if (!(this instanceof Collection)) {
      return new Collection(id)
    }

    this.id = id
    this.url = `${baseurl}/collection/${this.id}`
  }

  Collection.prototype._req = req
  Object.assign(Collection.prototype, proto)

  return Collection
}

var proto = {
  /**
   * Answers in this collection.
   *
   * @param  {Number} page
   * @return {Promise}
   * @public
   */
  answers(page = 1) {
    var url = `/collection/${this.id}`
    var params = {
      page
    }

    return this._req.get(url, params)
      .$()
      .then(parser.answers)
  }
}
