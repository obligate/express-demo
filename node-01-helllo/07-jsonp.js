// 创建一个简单的http服务器程序

// 1. 加载http模块
var http = require('http');
// 这个核心模块，可以帮助我们解析URL地址，从而拿到 pathname query
var urlModule =require('url');


// 2.创建一个http服务对象
var server = http.createServer();

// 3. 监听用户的请求事件(request事件)
server.on('request', function (req,res){
	// const url =req.url;
	const { pathname:url, query} = urlModule.parse(req.url,true);
	if(url === "/getscript"){
		var data = {
			name:'xjj',
			age:18,
			gender:'女'
		};

		// 拼接一个合法的js脚本，这里拼接的是一个方法的调用
		// var scriptStr = 'show()'
		var scriptStr = `${query.callback}(${JSON.stringify(data)})`
		// res.end 发送给客户端，客户端去把这个字符串，当作JS代码去解析执行
		console.log(scriptStr);
		res.end(scriptStr);
	}else{
		res.end('404');
	}
});

// 4. 启动服务
server.listen(3000, function(){
	console.log('服务启动了，请访问http://127.0.0.1:3000');
});