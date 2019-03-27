var fs = require('fs');

var msg = 'hello world';

fs.writeFile('./hello.txt', msg, 'utf8',function(err){
	//如果 err === null，表示写入文件成功，没有错误！
	//如果err里面不是null，就表示写入文件失败了！
	if(err){
		console.log('写文件出错啦，具体错误：' + err);
	}else{
		console.log('ok');
	}
});