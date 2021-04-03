const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.options = {};
    this.options.limit = options && options.limit || 0;
    this.options.encoding = options && options.encoding || 'utf-8';
    this.size = 0;
  }

  _transform(chunk, encoding, callback) {
    this.size += chunk.length;
    if (this.size > this.options.limit) {
      callback(new LimitExceededError(), null);
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
