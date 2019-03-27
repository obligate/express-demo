// 入口文件

// 加载ejs 模块
var ejs = require('ejs');
var path = require('path');

// //render 
// var html = '<h1><%= username %></h1>';
// var result = ejs.render(html,{username: '张三'});
// console.log(result);



// renderFile
ejs.renderFile(path.join(__dirname, 'index.html'), { title:"这个一个演示标题",msg:'你好世界!'}, function(err,result){
	console.log(result);
});