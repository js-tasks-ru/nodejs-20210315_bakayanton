const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.tempData = '';
  }

  _transform(chunk, encoding, callback) {
    this.tempData += chunk;
    // console.log('this.tempData:');
    // console.log(this.tempData);
    if (this.tempData.indexOf(os.EOL) < 0) {
      return callback();
    }

    const lines = this.tempData.split(os.EOL);
    // console.log(lines);
    for (let i = 0; i < lines.length - 1; i++) {
      // console.log('value: ', lines[i]);
      // only one callback per chunk. Use emit instead.
      this.emit('data', lines[i]);
      // callback(null, lines[i]);
    }
    this.tempData = lines[lines.length-1];
    callback();
  }

  _flush(callback) {
    if (this.tempData.length) {
      // console.log('_flush:', this.tempData);
      callback(null, this.tempData);
    } else {
      callback();
    }
  }
}

module.exports = LineSplitStream;
