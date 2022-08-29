/*
 * @Author: sleaf.ye
 * @Date: 2022-08-24 14:55:47
 * @LastEditors: sleaf.ye
 * @LastEditTime: 2022-08-29 19:28:02
 * @FilePath: \WebNodeServer\test\testExpress.js
 * @Description: 测试express框架
 */
let express = require("express");
let path = require("path");
let app = express();

console.log("__dirname:", __dirname);
let staticPath = path.join(__dirname, "../static")
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

app.post("/upload/error", function(request, response) {
    console.log("/upload error");
    // 获得url上传来的参数
    // console.log(request.query);

    // 获得用户给我们发送过来的数据
    // 监听我们的data来获得
    request.on("data", function(data) {
        console.log(data.toString());
        response.send("UPLOAD OK");	
    });
});

app.post("/upload/log", function(request, response) {
    console.log("/upload log");
    // 获得url上传来的参数
    console.log(request.query);

    // 获得用户给我们发送过来的数据
    // 监听我们的data来获得
    request.on("data", function(data) {
        console.log(data.toString());
        response.send("UPLOAD OK");	
    });
});
app.listen(6080);

