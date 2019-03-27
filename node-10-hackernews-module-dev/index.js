// 模块一（服务模块）：负责启动服务
// 模块二（扩展模块）：负责扩展 req 和 res 对象，为req 和res对象增加一下更方便的好用的api
// 模块三（路由模块）：负责路由判断
// 模块四（业务模块）：负责处理具体路由的业务的代码
// 模块五（数据操作模块）： 负责进行数据库操作
// 模块六（配置模块）： 负责保存各种项目中用到的配置信息

// 1. 加载http模块
var http = require('http');
var context = require('./context.js');
var router = require('./router.js');
var config = require('./config.js');

// var count = 0; // 这里的代码只有在第一次启动的时候会执行一次。
console.log('1'); // 测试模块加载顺序
// 创建服务
http.createServer(function(req, res) {

    // count++; // 这里的代码每次请求都会执行
    console.log('哈哈');
    // 调用 context.js 模块的返回值（函数），并将 req 和 res 对象传递给 context.js 模块
    context(req, res);

    // 调用 路由模块的返回值（函数），并将 req 和 res 对象传递给 router.js 模块
    router(req, res);

}).listen(config.port, function() {
    console.log('http://localhost:' + config.port);
});