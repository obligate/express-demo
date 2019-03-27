// 当前项目（包）的入口文件
// 需要通过npm init -y创建一个package.json指定入口文件

// 封装一个 render() 函数
// 将 render 函数挂载到 res 对象上，可以通过 res.render() 来访问
// 实现get方式添加新闻
// 实现在原来 list 数组的基础上追加新闻，而不是覆盖
// 实现post方式提交新闻
// 实现首页显示新闻列表
// 显示实现新闻详情页
// 封装 读取data.json 文件和写入 data.json文件的方法

// 1. 加载http模块

var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var url = require('url');
var querystring = require('querystring');
var _ = require('underscore');

// 情况1： require()的参数是一个路径
// require('./index2.js');

// index2.js
// index2.json
// index2.node
// index2 文件夹 -> package.json -> main(入口文件app.js -> index.js/index.json/index.node) -> 加载失败
// require('./index2');

// 情况二: require()的参数不是路径，直接就是一个模块名称
// 1. 先在核心模块中查找，是否有和给定的名字一样的模块。如果有，则直接加载该核心模块。
// 2. 如果核心模块中没有该模块那么就会认为这个模块是第三方模块（自定义模块）
// 先会去当前js文件所在目录下去找是否有一个node_modules文件夹
// var http = require('http');
// var mime = require('mime');
http.createServer(function(req, res) {
    // body ...

    // 为res对象添加一个render() 函数，方便后续调用
    // 因为现在要渲染的 index.html 中需要用到模板数据，所以给 render 函数增加了第二个参数
    // 第二个参数的作用就是用来传递 html 页面中姚世勇的模板数据
    res.render = function(filename, tplData) {
        fs.readFile(filename, function(err, data) {
            if (err) {
                // throw err;
                res.writeHead(404, 'Not Found', {
                    'Content-Type': 'text/html;charset=utf-8'
                });
                res.end('404 Not Found');
                return; //必须添加
            }
            res.setHeader('Content-Type', mime.getType(filename));

            // 如果用户传递了模板数据，那么就使用 underscore 的 template方法进行替换
            // 如果用户没有传递模板数据，那么就不进行替换
            if(tplData){
                // 如果用户传递了模板数据，表示要进行模板替换
                var fn = _.template(data.toString('utf8'));
                data = fn(tplData);
            }
            res.end(data);
        });
    };
   
    // 将用户请求的 url 和 method 转换为小写字母
    req.url = req.url.toLowerCase();
    req.method = req.method.toLowerCase();

    // 通过 url 模块，调用 url.parse() 方法解析用户请求的 url (req.url)
    var urlObj = url.parse(req.url, true);

    // 先根据用户请求的路径（路由），将对应的html页面显示出来
    if (req.url === '/' || req.url === '/index' && req.method === 'get') {

        readNewsData(function(list){
            res.render(path.join(__dirname, 'views', 'index.html'), {list: list});
        });
       
    } else if (req.url === '/submit' && req.method === 'get') {
        // 1. 读取submit.html 并返回
        res.render(path.join(__dirname, 'views', 'submit.html'));
    } else if (urlObj.pathname === '/item' && req.method === 'get') {
        readNewsData(function(list_news) {
            var model = null;
            // 循环 list_news 中的数据，找到和 id 值相等的数据
            for (var i = 0; i < list_news.length; i++) {
                // 判断集合中是否有与用户提交的id相等的新闻
                if (list_news[i].id.toString() === urlObj.query.id) {
                    // 如果找到了相等的新闻，则将其记录下来
                    model = list_news[i];
                    break;
                }
            }

            if (model) {
                res.render(path.join(__dirname, 'views', 'detail.html'), { 'item': model });
            } else {
                res.end('No Such Item');
            }
        });
    } else if (req.url.startsWith('/add') && req.method === 'get') {
        // 1. 读取data.json 文件中的数据
    readNewsData(function(list) {
        // 2.
        //  在把新闻添加到list之前，为新闻增加一个id属性
        urlObj.query.id = list.length;
        list.push(urlObj.query);

        // 3. 写入 data.json文件
        writenNewsData(JSON.stringify(list), function() {
            // 重定向
            res.statusCode = 302;
            res.statusMessage = 'Found';
            res.setHeader('Location', '/');
            res.end();
        })
    });
        
    } else if (req.url === '/add' && req.method === 'post') {
        // 1. 读取 data.json 
        readNewsData(function(list) {
            // 2. 读取用户post提交的数据
            postBodyData(req, function(postData) {
                // 3. 为用户提交的新闻增加一个id属性，并且把新闻对象push到list中
                postData.id = list.length;
                list.push(postData);
                // 4. 将新的 list 数组，再写入到 data.json 文件中
                writenNewsData(JSON.stringify(list), function() {
                    // 重定向
                    res.statusCode = 302;
                    res.statusMessage = 'Found';
                    res.setHeader('Location', '/');
                    res.end();
                });
            });
     });
    } else if (req.url.startsWith('/resources') && req.method === 'get') {
        // 如果用户请求是以 /resources 开头,并且是get请求，就认为用户是要请求的静态资源
        ///resources/css/news.css
        res.render(path.join(__dirname, req.url));
    } else {
        res.writeHead(404, 'Not Found', {
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.end('404, Page Not Found.');
    }

}).listen(9090, function() {
    console.log('http://localhost:9090');
});




// 封装一个读取data.json 文件的函数

function readNewsData(callback) {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', function(err, data) {
        if (err && err.code !== 'ENOENT') {
            throw err;
        }
        var list = JSON.parse(data || '[]');
        // 通过调用回调函数callback() 将读取到的数据 list，传递出去
        callback(list);
    });
}

// 封装一个写入data.json 文件的函数
function writenNewsData(data, callback){
     fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, function(err) {
        if (err) {
            throw ex;
        }
        // 调用callback() 来执行当写入数据完毕后的操作
       callback();
    });
}

// 封装一个获取用户 post 提交的数据的方法
function postBodyData(req, callback) {
    var array = [];
    req.on('data', function(chunk) {
        array.push(chunk);
    });

    req.on('end', function() {
        var postBody = Buffer.concat(array);
        // 把获取的Buffer 对象转换为一个字符串
        postBody = postBody.toString('utf8');
        // 把post 请求的查询字符串，转换为一个json对象
        postBody = querystring.parse(postBody);
        // 把用户post 提交过来的数据传递出去
        callback(postBody);
    })
}