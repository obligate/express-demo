// 该模块负责对 req 和 res对象进行扩展

// 希望在该模块做什么：
// 1. 为 req 增加一个query属性，该属性中保存的就是用户 get 请求提交过来的数据
// - req.query
// 2. 为 req 增加一个 pathname 属性
//  - req.pathname
// 3. 为 res 增加一个 render 函数

var url = require('url');
var fs = require('fs');
var mime = require('mime');
var _ = require('underscore');

console.log('2');

// 让当前模块对外暴露一个函数，通过这个函数将 index.js 中的req 和 res 传递到当前 context.js这个模块中
module.exports = function(req, res) {
    // 1. 为 req 增加一个query属性
    var urlObj = url.parse(req.url.toLowerCase(), true);
    req.query = urlObj.query;
    //  2. 为 req 增加一个 pathname 属性
    req.pathname = urlObj.pathname;
    // 3. 把 请求方法 req.method 转换为小写
    req.method = req.method.toLowerCase();

    // 4. 为 res 增加一个 render 函数
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
            if (tplData) {
                // 如果用户传递了模板数据，表示要进行模板替换
                var fn = _.template(data.toString('utf8'));
                data = fn(tplData);
            }
            res.end(data);
        });
    };
};