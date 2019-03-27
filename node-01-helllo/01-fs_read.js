var fs = require('fs');


// fs.readFile('./hello.txt',function(err,data){
// 	if(err){
// 		throw err;
// 	}
// 	// data 参数的数据是一个buffer对象，里面保存的就是一个一个的字节（理解为字节数组）
// 	//console.log(data);
// 	// 把buffer对象转换成字符串，调用toString()方法
// 	// console.log(data.toString('utf8'));

// 	// 调用buffer对象的toString，不传utf8参数，默认就是utf8编码
// 	console.log(data.toString());
// });



fs.readFile('./hello.txt','utf8',function(err,data){
	if(err){
		throw err;
	}
	console.log(data);
});