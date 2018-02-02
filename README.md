# filewatcher
A simple file watcher mainly used with remote configuration

### Overview
Allows you to watch a certain configuration file for changes. An event (`file:change`) is emitted on change that returns the file
content and allows you to act on those changes. This is a great tool to use for configuration changes read in one docker
container and listened to in another via a shared volume.

### Install
```
npm install -S config-watcher
```

### Use
```
const Watcher = require('config-watcher');

const watcher = new Watcher({ filePath: '...' });

watcher.on('file:change', file => {
  // do something
});
```

### API

#### Init
`new Watcher({ filePath: filePath })` - Watcher object
- `filePath`: The file path to watch

#### Events
`.on('file:change')` - The event emitted on file change
- returns `file` the file changes

