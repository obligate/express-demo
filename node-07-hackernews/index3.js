// 当前项目（包）的入口文件
// 需要通过npm init -y创建一个package.json指定入口文件

// 封装一个 render() 函数
// 将 render 函数挂载到 res 对象上，可以通过 res.render() 来访问
// 实现get方式添加新闻

// 1. 加载http模块

var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var url = require('url');

http.createServer(function(req,res){
	// body ...

	// 为res对象添加一个render() 函数，方便后续调用
	res.render = function(filename){
		fs.readFile(filename, function(err,data){
			if(err){
				// throw err;
				res.writeHead(404,'Not Found',{
					'Content-Type':'text/html;charset=utf-8'
				});
				res.end('404 Not Found');
				return;//必须添加
			}
			res.setHeader('Content-Type',mime.getType(filename));
			res.end(data);
		});
	};
	// 设计路由
	// 当用户请求 / 或 /index 时，显示新闻列表   - get 请求
	// 当用户请求 /item 时， 显示新闻详情		- get 请求
	// 当用户请求 /submit 时，显示添加新闻页面   - get 请求
	// 当用户请求 /add 时，将用户提交的新闻保存到 data.json 文件中   - get 请求
	// 当用户请求 /add 时，将用户提交的新闻保存到 data.json 文件中   - post 请求
	// 将用户请求的 url 和 method 转换为小写字母
	req.url = req.url.toLowerCase();
	req.method = req.method.toLowerCase();

	// 通过 url 模块，调用 url.parse() 方法解析用户请求的 url (req.url)
	var urlObj = url.parse(req.url,true);
	// console.log(urlObj);
	// urlObj.query.title

	// 先根据用户请求的路径（路由），将对应的html页面显示出来
	if(req.url === '/' || req.url === '/index' && req.method === 'get'){
		// 1. 读取index.html 并返回
		res.render(path.join(__dirname,'views','index.html'));
	}else if ( req.url === '/submit' && req.method === 'get') {
		// 1. 读取submit.html 并返回
		res.render(path.join(__dirname,'views','submit.html'));
	}else if (req.url === '/item' && req.method === 'get'){
		// 1. 读取 detail.html并返回
		res.render(path.join(__dirname,'views','detail.html'));
	}else if (req.url.startsWith('/add') && req.method === 'get'){
		// /add?title=es+title&url=dddddd&text=dddddd
		// 表示 get 方法提交一条新闻
		// 要获取用户 get 提交的数据，需要用到 url 模块(这个模块是node.js 内置模块，不是第三方模块)
		// 既然是 get  提交数据，所以通过 req.url 就可以直接获取这些数据，但是这样使用起来不方便（得自己去截取字符串，然后获取想要的数据）
		// 通过 url 模块，可以将用户 get 提交的数据解析成一个json对象，使用起来很方便
		// console.log(req.url);
		// res.end('over');
		// 1. 获取用户 get 提交过来的新闻数据
		// urlObj.query.title
		// urlObj.query.url
		// urlObj.query.text

		// 2. 把用户提交的新闻数据保存到 data.json 文件中
		var list = [];
		list.push(urlObj.query);
		// 把list数据中的数据写入到 data.json 文件中
		fs.writeFile(path.join(__dirname,'data','data.json'), JSON.stringify(list), function(err){
			if(err){
				throw ex;
			}
			console.log('ok');
			// 设置响应报文头，通过响应报文头告诉浏览器，执行一次页面跳转操作
			// 3. 跳转到新闻列表页
			// 重定向
			res.statusCode = 302;
			res.statusMessage = 'Found';
			res.setHeader('Location','/');
			res.end();
		});
		
	}else if (req.url === '/add' && req.method === 'post'){
		// 表示 post 方法提交一条新闻
	}else if (req.url.startsWith('/resources') && req.method === 'get'){
		// 如果用户请求是以 /resources 开头,并且是get请求，就认为用户是要请求的静态资源
		///resources/css/news.css
		res.render(path.join(__dirname,req.url));
	}
	else{
		res.writeHead(404,'Not Found',{
			'Content-Type':'text/html;charset=utf-8'
		});
		res.end('404, Page Not Found.');
	}

}).listen(9090, function(){
	console.log('http://localhost:9090');
});



