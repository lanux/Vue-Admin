const jsonServer = require('json-server')
var path = require('path')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, '../static/data/data.json'))
const middlewares = jsonServer.defaults()

const config = require("../src/mock/mock.js")

function parseKey(key) {
  var method = 'get';
  var path = key;

  if (key.indexOf(' ') > -1) {
    var splited = key.split(' ');
    method = splited[0].toLowerCase();
    path = splited[1];
  }

  return { method: method, path: path };
}

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

function createMockHandler(method, path, value) {
  return function mockHandler(...args) {
    const res = args[1];
    if (typeof value === 'function') {
      value(...args);
    } else {
      res.json(value);
    }
  };
}

Object.keys(config).forEach(function (key) {
  var keyParsed = parseKey(key);
  if(!server[keyParsed.method]){
    console.error('method of ' + key + ' is not valid')
  }
  if(!(typeof config[key] === 'function' || typeof(config[key]) === 'object')){
    console.error('mock value of ' + key + ' should be function or object or string, but got ' + typeof(config[key]))
  }
  server[keyParsed.method](keyParsed.path, createMockHandler(keyParsed.method, keyParsed.path, config[key]));
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Use default router
server.use(router)

server.listen(3000, () => {
  console.log('Mock Server is running')
})
