// 当前项目（包）的入口文件
// 需要通过npm init -y创建一个package.json指定入口文件

// 1. 加载http模块

var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

http.createServer(function(req,res){
	// body ...

	// 设计路由
	// 当用户请求 / 或 /index 时，显示新闻列表   - get 请求
	// 当用户请求 /item 时， 显示新闻详情		- get 请求
	// 当用户请求 /submit 时，显示添加新闻页面   - get 请求
	// 当用户请求 /add 时，将用户提交的新闻保存到 data.json 文件中   - get 请求
	// 当用户请求 /add 时，将用户提交的新闻保存到 data.json 文件中   - post 请求
	// 将用户请求的 url 和 method 转换为小写字母
	req.url = req.url.toLowerCase();
	req.method = req.method.toLowerCase();
	// 先根据用户请求的路径（路由），将对应的html页面显示出来
	if(req.url === '/' || req.url === '/index' && req.method === 'get'){
		// 1. 读取index.html 并返回
		fs.readFile(path.join(__dirname,'views','index.html'),function(err,data){
			if(err){
				throw err;
			}
			res.end(data);
		});
	}else if ( req.url === '/submit' && req.method === 'get') {
		// 1. 读取submit.html 并返回
		fs.readFile(path.join(__dirname,'views','submit.html'),function(err,data){
			if(err){
				throw err;
			}
			res.end(data);
		});
	}else if (req.url === '/item' && req.method === 'get'){
		// 1. 读取 detail.html并返回
		fs.readFile(path.join(__dirname,'views','detail.html'),function(err,data){
			if(err){
				throw err;
			}
			res.end(data);
		});
	}else if (req.url === '/add' && req.method === 'get'){
		// 表示 get 方法提交一条新闻
	}else if (req.url === '/add' && req.method === 'post'){
		// 表示 post 方法提交一条新闻
	}else if (req.url.startsWith('/resources') && req.method === 'get'){
		// 如果用户请求是以 /resources 开头,并且是get请求，就认为用户是要请求的静态资源
		///resources/css/news.css
		fs.readFile(path.join(__dirname,req.url), function(err,data){
			if(err){
				// throw err;
				res.writeHead(404,'Not Found',{
					'Content-Type':'text/html;charset=utf-8'
				});
				res.end('404 Not Found');
				return;//必须添加
			}
			res.setHeader('Content-Type',mime.getType(req.url));
			res.end(data);
		});
	}
	else{
		res.writeHead(404,'Not Found',{
			'Content-Type':'text/html;charset=utf-8'
		});
		res.end('404, Page Not Found.');
	}

}).listen(9090, function(){
	console.log('http://localhost:9090');
});