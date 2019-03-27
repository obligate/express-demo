// 业务模块
var path = require('path');



// 处理新闻列表 index
module.exports.index = function(req,res){
	//res.send('这个是handler .index 方法中的源代码');
	// sendFile() 方法虽然可以读取对应的文件并返回，但是我们不使用 sendFile() 方法
	// 原因是： 将来我们要对 index.html 中的模板代码进行执行并替换
	// res.sendFile(path.join(__dirname,'views','index.html'));


	// 默认 render 方法是不能使用的，需要为 express 配置一个模板引擎，然后才可以使用
	res.render(path.join(__dirname,'views','index.html'));
};