+ express-generator
安装express的脚手架工具express-generator，这对于我们学习express很有帮助
```
npm install -g express-generator
```
+ 初始化demo
express生成以下目录
```
/tmp mkdir express-demo
/tmp cd express-demo 
   
  express

   create : .
   create : ./package.json
   create : ./app.js
   create : ./public
   create : ./public/javascripts
   create : ./public/images
   create : ./public/stylesheets
   create : ./public/stylesheets/style.css
   create : ./routes
   create : ./routes/index.js
   create : ./routes/users.js
   create : ./views
   create : ./views/index.jade
   create : ./views/layout.jade
   create : ./views/error.jade
   create : ./bin
   create : ./bin/www
```
按照指引，安装依赖。并启动服务
npm install
然后，启动服务器
npm start
访问浏览器，迈出成功的第一步
http://127.0.0.1:3000/



##FAQ
+ 使用cross-env解决跨平台设置NODE_ENV的问题
windows不支持NODE_ENV=development的设置方式，cross-env能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行
```
npm install cross-env --save-dev
yarn add cross-env  --dev
在NODE_ENV=xxxxxxx前面添加cross-env就可以了
yarn test执行所有的测试用例test是package.json中scripts设置的test
```