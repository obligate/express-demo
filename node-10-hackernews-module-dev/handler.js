// 该模块负责对具体的业务进行处理
// 步骤：
// 1. 思考: 该模块中要封装什么代码?
// 2. 思考： 这些代码有用到外部的数据吗？ 如果用到了，是否需要通过参数将这些数据传递到当前模块中
// 3. 当前模块对外需要暴露的东西(module.exports的值)

// module.exports = {};
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var config = require('./config.js');


console.log('4');

// 处理请求 / 和 /index 的业务方法
module.exports.index = function(req, res) {
    readNewsData(function(list) {
        res.render(path.join(__dirname, 'views', 'index.html'), { list: list });
    });
};

// 处理请求 /submit 的业务方法
module.exports.submit = function(req, res) {
    // 1. 读取submit.html 并返回
    res.render(path.join(__dirname, 'views', 'submit.html'));
};

// 处理请求 /item 的业务方法，显示新闻详情
module.exports.item = function(req, res) {
    readNewsData(function(list_news) {
        var model = null;
        // 循环 list_news 中的数据，找到和 id 值相等的数据
        for (var i = 0; i < list_news.length; i++) {
            // 判断集合中是否有与用户提交的id相等的新闻
            if (list_news[i].id.toString() === req.query.id) {
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
};

// 处理get 方式添加新闻
module.exports.addGet = function(req, res) {
    // 1. 读取data.json 文件中的数据
    readNewsData(function(list) {
        // 2.
        //  在把新闻添加到list之前，为新闻增加一个id属性
        req.query.id = list.length;
        list.push(req.query);

        // 3. 写入 data.json文件
        writenNewsData(JSON.stringify(list), function() {
            // 重定向
            res.statusCode = 302;
            res.statusMessage = 'Found';
            res.setHeader('Location', '/');
            res.end();
        })
    });
};

// 处理post方式添加新闻
module.exports.addPost = function(req, res) {
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
};

// 处理静态资源请求
module.exports.static = function(req, res) {
    // 如果用户请求是以 /resources 开头,并且是get请求，就认为用户是要请求的静态资源
    ///resources/css/news.css
    res.render(path.join(__dirname, req.url));
};

// 处理 404 错误请求
module.exports.handleErrors = function(req, res) {
    res.writeHead(404, 'Not Found', {
        'Content-Type': 'text/html;charset=utf-8'
    });
    res.end('404, Page Not Found.');
};
// 封装一个读取data.json 文件的函数
function readNewsData(callback) {
    fs.readFile(config.dataPath, 'utf8', function(err, data) {
        if (err && err.code !== 'ENOENT') {
            throw err;
        }
        var list = JSON.parse(data || '[]');
        // 通过调用回调函数callback() 将读取到的数据 list，传递出去
        callback(list);
    });
}

// 封装一个写入data.json 文件的函数
function writenNewsData(data, callback) {
    fs.writeFile(config.dataPath, data, function(err) {
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