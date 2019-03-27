// 路由模块，主要负责路由判断
// 1. 创建一个router 对象 （router 对象既是一个对象，也是一个函数）
var express = require('express');
var router = express.Router();
var handler = require('./handler.js');
var path = require('path');

// 2. 通过 router 对象设置（挂载) 路由
router.get('/', handler.index);
router.get('/index', handler.index);

router.get('/submit', function(req, res) {

});
router.get('/item', function(req, res) {

});
router.get('/add', function(req, res) {

});
router.post('/add', function(req, res) {

});


// 实现对 resources 文件夹下的内容进行静态资源托管
// /resources/css/news.css
// /resources/images/y18.gif
router.use('/resources', express.static(path.join(__dirname,'resources')));
// 3. 返回 router 对象

module.exports = router;