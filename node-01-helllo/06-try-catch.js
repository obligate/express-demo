// var fs = require('fs');

// fs.writeFile('./xxx/trycatch.txt','大家好','utf8', function(err){
// 	if(err){
// 		console.log('出错了');
// 		throw err;
// 	}

// 	console.log('ok');
// });


// 异步操作，try-catch是无法捕获异常的
// 对于异步操作，要通过判断错误号err.code来进行出错处理
// 以下演示的就是无法捕获的情况
var fs = require('fs');

try{
	fs.writeFile('./xxx/trycatch.txt','大家好','utf8', function(err){
		console.log('ok');
	});
}catch(e){
	console.log('出错了~' + e);
}