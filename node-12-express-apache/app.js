// 入口文件
// 模拟静态资源服务器 (Apache服务器)

// 1. 加载 express 模块
var express = require('express');
var path = require('path');

// 创建 app 对象
var app = express();

// // // 处理静态资源的方法
// // var fn = express.static(path.join(__dirname, 'public'));
// // // 注册路由
// // app.use('/', fn);

// // 这种写法完全等价于上面的写法
// // 参数1叫做： 虚拟路径,就是一个标识
// app.use('/xxx', express.static(path.join(__dirname, 'public')));
// index.html
// /xxx/index.html

//  问题1：注册两个虚拟路径都指向静态资源
// app.use('/xxx', express.static(path.join(__dirname, 'public')));
// app.use('/www', express.static(path.join(__dirname, 'public')));

//  问题2: pp中没有index.html，再从public里面找，如果pp有，直接显示index.html内容
app.use('/xxx', express.static(path.join(__dirname, 'pp')));
app.use('/xxx', express.static(path.join(__dirname, 'public')));

// 启动服务
app.listen(9999, function(){
	console.log('http://localhost:9999');
});