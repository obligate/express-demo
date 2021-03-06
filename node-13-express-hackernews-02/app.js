// app.js 模块职责： 负责启动服务

// 1. 加载 express 模块
var express = require('express');
var config = require('./config.js');
var router = require('./router.js');

// 2. 创建 app 对象
var app = express();
// console.log(router.toString());

// 3. 注册路由
// 设置app 与 router相关联
// app.use('/', router);
// 跟以上完全等价
app.use(router);

// 4. 启动服务
app.listen(config.port, function(){
	console.log('http://localhost:' + config.port);
});