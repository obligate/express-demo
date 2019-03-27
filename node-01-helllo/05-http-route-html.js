// 根据用户不同请求，做出不同响应（响应 现有的html文件)

var http = require('http');
// 加载fs模块
var fs = require('fs');
// 加载path模块
var path = require('path');

http.createServer(function(req,res){
if(req.url === '/' || req.url ==='/index'){
	//读取index.html文件
	fs.readFile(path.join(__dirname,'htmls','index.html'), function(err,data){
		if(err){
			throw err;
		}
		//把读取到的index.html的内容直接发送给浏览器
		res.end(data);
	});
	} else if (req.url === '/login'){
		//读取index.html文件
	fs.readFile(path.join(__dirname,'htmls','login.html'), function(err,data){
		if(err){
			throw err;
		}
		//把读取到的index.html的内容直接发送给浏览器
		res.end(data);
	});

	} else if (req.url === '/list'){
		//读取index.html文件
	fs.readFile(path.join(__dirname,'htmls','list.html'), function(err,data){
		if(err){
			throw err;
		}
		//把读取到的index.html的内容直接发送给浏览器
		res.end(data);
	});
	} else if(req.url === '/register'){
		//读取index.html文件
	fs.readFile(path.join(__dirname,'htmls','register.html'), function(err,data){
		if(err){
			throw err;
		}
		//把读取到的index.html的内容直接发送给浏览器
		res.end(data);
	});
	} else{
		//读取index.html文件
	fs.readFile(path.join(__dirname,'htmls','404.html'), function(err,data){
		if(err){
			throw err;
		}
		//把读取到的index.html的内容直接发送给浏览器
		res.end(data);
	});
	}
}).listen(9090,function(){
	console.log("http://localhost:9090");
});