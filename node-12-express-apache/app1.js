// 1. 加载 express 模块
var express = require('express');
var path = require('path');

// 创建 app 对象
var app = express();

app.get("/", function(req, res){
	// res.json({name:'张三',age:1}); // 等价于 res.send(json);
	// res.redirect('https://www.baidu.com');
	// res.redirect(301, 'https://www.baidu.com');

	// res.sendFile(path.join(__dirname,'public','views','index.html'), function(err){
	// 	if(err){
	// 		throw err;
	// 	}
	// 	console.log('ok');
	// })

	res.status(404).end('文件不存在！');
});


// 启动服务
app.listen(9000, function(){
	console.log('http://localhost:9000');
});


// HTTP/1.1 200 OK
// X-Powered-By: Express
// Content-Type: application/json; charset=utf-8
// Content-Length: 25
// ETag: W/"19-ttsH4N/JWsC3QIVIYE0MSbdYmRI"
// Date: Wed, 27 Jun 2018 02:07:59 GMT
// Connection: keep-alive