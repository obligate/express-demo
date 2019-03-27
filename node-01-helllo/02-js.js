// var fs = require('fs');

// // 此处./ 相对路径，相对的是执行node命令所在的目录
// fs.readFile('./hello.txt','utf8',function(err,data){
// 	if(err){
// 		throw err;
// 	}

// 	console.log(data);
// });


// 解决在文件读取中 ./相对路径的问题
// 解决： __dirname、 __filename
// __dirname:表示,当前正在执行的js文件所在的目录
// __filename: 表示，当前正在执行的js文件的完整路径

// console.log(__dirname);
// console.log(__filename);




var fs = require('fs');
var path = require('path');

//var filename = __dirname + '\\' + 'hello.txt';
var filename = path.join(__dirname,'hello.txt');
console.log(filename);
// 此处./ 相对路径，相对的是执行node命令所在的目录
fs.readFile(filename,'utf8',function(err,data){
	if(err){
		throw err;
	}

	console.log(data);
});
