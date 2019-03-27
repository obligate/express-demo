var a = 100;


// 这两种都可以
// module.exports.a = a;
// exports.a  = a;

// 不要改变他的指向，因为require默认执行的是module.exports
// module.exports=a;
// exports=a;