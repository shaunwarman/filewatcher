const Assert = require('assert');
const FS = require('fs');
const Path = require('path');

const {EventEmitter} = require('events');
const {promisify} = require('util');

const asyncRead = promisify(FS.readFile);


class Watcher extends EventEmitter {
  constructor(options = {}) {
    super(options);
    
    const {filePath} = options;
    
    Assert(typeof filePath === 'string', 'file to watch is not a string!');
    
    this.filePath = filePath;
    this.watcher = FS.watch(filePath);
    this.watcher.on('change', this._onChange.bind(this));
  }
  
  async _onChange(evt, filepath) {
    let file = null;
    
    try {
      file = await asyncRead(this.filePath);
    }
    catch (e) {
      console.error('Unable to handle file change', e);
    }
    
    this.emit('file:change', file.toString('utf8'));
  }
  
  close() {
    this.watcher.close();
  }
}

module.exports = Watcher;

