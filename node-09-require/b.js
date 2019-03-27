function add(x,y){
	return x+ y;
}

var result = add(100,1000);

console.log(result); 

// ------------------------ module.exports 介绍--------------------
// // module.exports = 'hello world!';

// // module.exports =  6666;


// // module.exports =  function(msg){
// // 	console.log(msg);
// // };


// module.exports.name = '张三';
// module.exports.age = 18;
// module.exports.show  = function(){
// 	console.log(this.name + this.age);
// };



// --------------------exports 介绍
// 1. 
// module.exports.name='张三';
// exports.age = 18;
// exports.show=function(){
// 	console.log(this.name + this.age);
// };

// 2. 
// exports 和 module.exports指向的是一个对象
// 最终require()函数返回的是module.exports中的数据
// return module.exports
module.exports.name='张三';
exports.age = 18;
exports.show=function(){
	console.log(this.name + this.age);
};
// module.exports = 'hello world!';
exports = 'hello world!';