const delegate = require('delegates');

const proto = {};
proto.request = { acceptsLanguages() { console.log("acceptsLanguages") } }
delegate(proto, 'request')
  .method('acceptsLanguages')
// 对象代理了它属性上的方法
proto.acceptsLanguages()