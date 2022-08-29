/*
 * @Author: sleaf.ye
 * @Date: 2022-08-19 15:22:46
 * @LastEditors: sleaf.ye
 * @LastEditTime: 2022-08-29 19:31:07
 * @FilePath: \WebNodeServer\main.js
 * @Description: 启动入口
 */

// package.json  配置"main: main.js"

let express = require("express");
let path = require("path");
let app = express();

console.log("__dirname:", __dirname);
let staticPath = path.join(__dirname, "/static")
console.log("staticPath:", staticPath);
app.use(express.static(staticPath));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// http://localhost:6080/test?username=aaaa&passsword=1111111
app.get("/test", function (request, response) {
    console.log(request.query);
    // 底层会打包成http协议的回应，发送给客户端
    response.send("SUCCESS!");
});


app.listen(6080);

