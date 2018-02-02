const FS = require('fs');
const Path = require('path')
const Test = require('tape');
const Watcher = require('..');

const {promisify} = require('util');

const asyncRead = promisify(FS.readFile);
const asyncWrite = promisify(FS.writeFile);

Test('watcher', t => {
  const filePath = Path.resolve(process.cwd(), './test/fixtures/config.json');
  
  async function updateConfig() {
    const fs = await asyncRead(filePath);
    
    let file = null;
    try {
      file = JSON.parse(fs.toString());
    }
    catch (e) {
      console.log('Error reading config file', e);
    }
    
    const rand = Math.floor(Math.random() * 1000);
    file[rand] = rand;
    
    console.log(file);
    console.log(filePath);
    
    await asyncWrite(filePath, JSON.stringify(file));
  }
  
  t.test('init', t => {
    const watcher = new Watcher({ filePath });
    t.equals(typeof watcher, 'object');
    t.ok(watcher instanceof Watcher);
    watcher.close();
    t.end();
  });
  
  t.test('watch', t => {
    const watcher = new Watcher({ filePath });
    
    watcher.once('file:change', file => {
      console.log(`Changed ${file}`);
      t.ok(typeof file, 'string');
      watcher.close();
      t.end();
    });
    
    updateConfig();
  });
  
});