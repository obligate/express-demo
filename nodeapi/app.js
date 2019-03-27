const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// 引入 users.js
const users = require('./routes/api/users');


//DB config
const db = require('./config/keys').mongoURI;

// 使用 bod-parser 中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Connect to mongodb
mongoose.connect(db,{ useNewUrlParser: true } )
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log(err));

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);


const port = process.env.PORT || 5000;
app.use("/api/users",users);

app.get("/", (req,res) => {
    res.send("hello world!");
});

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});
