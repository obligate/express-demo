//-----------------------------------request-----------------------

// var http = require('http');


// http.createServer(function(req,res){

// 	// 1. 获取所有请求报文头
// 	// req.headers 返回的是一个对象，这个对象中包含了所有的请求报文头
// 	// console.log(req.headers);

// 	// req.rawHeaders 返回的是一个数组，数组中保存的都是请求报文头的字符串
// 	// console.log(req.rawHeaders);

// 	// 2. req.httpVersion
// 	// 获取请求客户端所使用的http版本
// 	// console.log(req.httpVersion);


// 	// 3. req.method
// 	// 获取客户端请求使用的方法(POST,GET,....)
// 	// console.log(req.method);

// 	// 4. req.url
// 	// 获取这次请求的url(获取请求报文中的请求路径，不包含主机名称，端口号，协议)
// 	console.log(req.url);
// 	res.end('over');
// }).listen(9091,function(){
// 	console.log("http://localhost:9091");
// });



//-----------------------------------response-----------------------

var http = require('http');


http.createServer(function(req,res){

	// res.statusCode = 404;
	// res.statusMessage = 'Not Found';
	// res.setHeader('Content-Type','text/plain;charset=utf-8');

	//通过res.writeHead() 来实现
	res.writeHead(404,'Not Found', {
		'Content-Type':'text/plain;charset=utf-8'
	});

	// 1. res.write()
	res.write('hello world! 你好世界！！');
	res.write('hello world! 你好世界！！');
	res.write('hello world! 你好世界！！');

	// 2. 每个请求都必须要调用的一个方法res.end();
	// 结束响应（请求）
	res.end();

	// 3. 通过res.setHeader()来设置响应报文头
	// res.setHeader()要放在res.write() 和 res.end()之前设置
	// res.setHeader('Content-Type','text/plain;chartset=utf-8');


	// 4. 设置 http 响应状态码
	// res.statusCode 设置http响应状态码
	// res.statusMessage 设置http 响应状态码对应的消息
	// res.statusCode = 404;
	// res.statusMessage = 'Not Found';

	// 5. res.writeHead()
	// 直接向客户端响应（写入） http 响应报文头
	// 建议在res.write 和 res.end()之前设置

}).listen(9091,function(){
	console.log("http://localhost:9091");
});