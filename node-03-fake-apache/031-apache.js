var http = require('http');
var path = require('path');
var fs = require('fs');
var mime = require('mime');

http.createServer(function(req,res){
	// 1. 获取用户请求的路径
	// req.url

	// 2. 获取public目录的完整路径
	var publicDir = path.join(__dirname,'public');

	// 3. 根据public的路径和用户请求的路径，最终计算出用户请求的静态资源的完整路径
	var filename = path.join(publicDir,req.url);
	// console.log(filename);
	// 4. 根据文件的完整路径去读取该文件，如果读取到了，则把文件返回给用户，如果读取不到，则返回404
	fs.readFile(filename,function(err,data){
		if(err){
			res.end('文件不存在 404');
		}else{
			// 通过第三方模块 mime，来判断不同的资源对应的 Content-type 的类型
			// https://www.npmjs.com/search?q=mime
			// https://www.npmjs.com/package/mime
			// 需要在当前目录执行npm安装  npm install mime
			res.setHeader('Content-Type',mime.getType(filename));
			// 如果找到了用户要读取的文件，那么直接把文件返回给用户
			res.end(data);
		}
	});
	// res.end('over');
}).listen(9090,function(){
	console.log("http://localhost:9090");
});