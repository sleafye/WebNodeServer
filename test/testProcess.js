/*
 * @Author: sleaf.ye
 * @Date: 2022-08-20 14:53:42
 * @LastEditors: sleaf.ye
 * @LastEditTime: 2022-08-23 20:39:21
 * @FilePath: \WebNodeServer\test\testprocess.js
 * @Description: 测试process模块
 */

setTimeout(()=>{
    console.log("test setTimeout");
}, 1500); // 1500毫秒

// 有事件node不会退出
// setInterval(() => {
//     console.log("test setInterval")
// }, 1000); // 1000毫秒

// process是node的一个全局模块
console.log("process.pid:", process.pid); // 进程id
console.log("process.version:", process.version); // node版本
console.log("process.platform:", process.platform); // 获取平台
console.log("process.title:", process.title);
console.log("process.execPath:", process.execPath); // 获取node所在路径
console.log("process.env:", process.env); // 获得系统的环境变量
console.log("process.stdout:", process.stdout);
console.log("process.stdin:", process.stdin);
console.log("process.argv:", process.argv); // 在启动的时候，我们可以往程序里面传入参数,参数都是字符串

console.log("process.uptime()", process.uptime()); // 获取当前进程运行的时间
// process.chdir("C:\\workspace"); // 修改工作目录
console.log("process.cwd()", process.cwd()); // 获取当前的工作目录

// process.nextTick 需要时再好好研究下
function testNextTick() {
    process.nextTick(()=>{
        console.log("test nextTick");

        // setTimeout(()=>{
        //     testNextTick();
        // }, 2000);
    });
}
testNextTick();

// 当node退出时执行回调
process.on("exit", function() {
	console.log("test node exit");
});

// 注册"uncaughtException"，使得调用testUncaughtException()后，程序不会退出
process.on("uncaughtException", function(err) {
	console.log("test uncaughtException", err);
});

// 测试报错，如果没有注册"uncaughtException"，报错并程序直接退出
testUncaughtException();
console.log("testUncaughtException"); // 不会被调用到

