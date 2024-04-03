/*
 * @Author: sleaf.ye
 * @Date: 2022-08-19 15:22:46
 * @LastEditors: sleaf.ye
 * @LastEditTime: 2023-11-01 17:47:26
 * @FilePath: \WebNodeServer\main.js
 * @Description: 启动入口
 */

// package.json  配置"main: main.js"

let express = require("express");
let ws = require("ws")
let path = require("path");
// let qs = require("querystring");
let app = express();

console.log("__dirname:", __dirname);
let staticPath = path.join(__dirname, "/static")
console.log("staticPath:", staticPath);
app.use(express.static(staticPath));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
	let str = '';
	req.on('data', (chunk)=> {
		str += chunk;
	})
	req.on('end', ()=>{
		// console.log(str);
		if (str) {
			try {
				req.body = JSON.parse(str);
			} catch (error) {
				console.error(error);
			}
		}
		next();
	})
})


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

app.post("/testPost", function (request, response) {
    console.log(request.headers);
	console.log(request.body);
	// console.log(request.body.app_id);
	
    // 底层会打包成http协议的回应，发送给客户端
    response.send('{"status": 0}');
})


app.listen(6080);

// WebSocket
var server = new ws.Server({
	host: "127.0.0.1",
	port: 5080,
});

// 监听接入进来的客户端事件
function websocket_add_listener(client_sock) {
	// close事件
	client_sock.on("close", function() {
		console.log("client close");
	});

	// error事件
	client_sock.on("error", function(err) {
		console.log("client error", err);
	});
	// end 

	// message 事件, data已经是根据websocket协议解码开来的原始数据；
	// websocket底层有数据包的封包协议，所以，绝对不会出现粘包的情况。
	// 每解一个数据包，就会触发一个message事件;
	// 不会出现粘包的情况，send一次，就会把send的数据独立封包。
	// 想我们如果是直接基于TCP，我们要自己实现类是于websocket封包协议；
	client_sock.on("message", function(data) {
		console.log(data);
		client_sock.send("Thank you!");
	});
	// end 
}

// connection 事件, 有客户端接入进来;
function on_server_client_comming (client_sock) {
	console.log("client comming");
	websocket_add_listener(client_sock);
}

server.on("connection", on_server_client_comming);

// error事件,表示的我们监听错误;
function on_server_listen_error(err) {

}
server.on("error", on_server_listen_error);

// headers事件, 回给客户端的字符。
function on_server_headers(data) {
	// console.log(data);
}
server.on("headers", on_server_headers);