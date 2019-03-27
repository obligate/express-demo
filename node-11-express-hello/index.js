// 入口文件

// -----------------------------实现了一个基本的hello world 程序----------
// // 1. 加载express模块
// var express = require('express');

// // 2. 创建一个app对象（类似于创建一个server对象）
// var app = express();

// // 通过中间件监听指定的路由的请求
// app.get('/index', function(req,res){
// 	// res.end('hello world, 你好世界');
// 	res.send('hello world, 你好世界');

// 	// res.send() 和 res.end()区别：
// 	// 1. 参数类型区别
// 	// - res.send()参数可以是 a Buffer object, a String, an object,  an Array
// 	// - res.end()参数只能是Buffer或者字符串
// 	// 2. res.send() 会自动发送更多的响应报文头，其中就包括Content-Type: text/html;charset=utf-8 所以没有乱码
// });
// // 3. 启动服务
// app.listen(9092,function(){
// 	console.log('http://localhost:9092');
// });



// -----------------------------express 中注册路由--------------
// 1. 加载express模块
var express = require('express');

// 2. 创建一个app对象（类似于创建一个server对象）
var app = express();

// ---------------------注册路由----------------------
// // 通过中间件监听指定的路由的请求
// // req.url中pathname部分必须和 /index 一致
// app.get('/index', function(req,res){
// 	res.send('hello world, 你好世界');
// });

// 1. 在进行路由匹配的时候不限定方法，什么请求方法都可以
// 2. 请求路径中的第一部分只要与 /index 相等即可，并不要求请求路径(pathname) 完全匹配
// app.use('/index', function(req,res){
// 	res.send('hello world, 你好世界');
// });

// // 通过正则表达式注册路由
// app.get(/^\/index(\/.+)*$/, function(req,res){
// 	res.send('hello world, 你好世界');
// });

// 通过req.params 获取路由中的参数
app.get('/news/:year/:month/:day', function(req, res){
	res.send(req.params);
});

// app.all()
// 通过app.all 注册路由 1. 不限定请求方法 2. 请求路径的pathname必须完全匹配
// app.all('/index', function(req,res){
// 	res.send('hello world, 你好世界');
// });

// // 注册一个 请求 / 的路由
// app.get('/', function(req,res){
// 	res.send('Index');
// });
// // 含义：
// // 1. 请求的方法必须是 get
// // 2. 请求路径的 pathname 必须等于(===) /submit
// app.get('/submit', function(req,res){
// 	res.send('submit');
// });

// app.get('/item', function(req,res){
// 	res.send('item');
// });

// app.get('/add', function(req,res){
// 	res.send('get add');
// });

// app.post('/add', function(req,res){
// 	res.send('post add');
// });

// 3. 启动服务
app.listen(9092,function(){
	console.log('http://localhost:9092');
});