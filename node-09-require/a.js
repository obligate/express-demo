// // // 加载b.js 模块

// // require('./b.js');


// // // 下面这些加载模块都是从缓存里面获取的，所以不会再去执行b.js文件了
// // require('./b.js');
// // require('./b.js');
// // require('./b.js');




// // Module
// // module
// console.log(module.paths);
// // [ 'E:\\Work\\MyCode\\node\\node-09-require\\node_modules',
// //   'E:\\Work\\MyCode\\node\\node_modules',
// //   'E:\\Work\\MyCode\\node_modules',
// //   'E:\\Work\\node_modules',
// //   'E:\\node_modules' ]




// 一个模块，默认被 require() 加载后，返回的是一个对象{}
var b = require('./b.js');
console.log(b);
// b.show();
// b('哈哈哈');