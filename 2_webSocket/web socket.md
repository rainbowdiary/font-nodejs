# webSocket
## 1. 为什么需要webSocket？
初次接触 WebSocket 的人，都会问同样的问题：我们已经有了 HTTP 协议，为什么还需要另一个协议？它能带来什么好处？

因为 HTTP 协议有一个缺陷：通信只能由客户端发起。

举例来说，我们想了解今天的天气，只能是客户端向服务器发出请求，服务器返回查询结果。HTTP 协议做不到服务器主动向客户端推送信息。

这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用"轮询"：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。

轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。

## 2. webSocket简介
* 时间：
	* 2008年诞生
	* 2011年成为国际标准，所有浏览器都已经支持了
* 主要特点:
	* 服务器可以主动向客户端推送信息
	* 客户端也可以主动向服务器发送信息
* 其他特点：
	* 建立在 TCP 协议之上，服务器端的实现比较容易。
	* 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
	* 数据格式比较轻量，性能开销小，通信高效。
	* 可以发送文本，也可以发送二进制数据。
	* 没有同源限制，客户端可以与任意服务器通信。（可以跨域）
	* 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。
		* 如http协议是 http://localhost:3000
		* 而webSocket协议是 ws://localhost:3000

## 3. webSocket的使用
* 本文讲的是基于socket.io这个库的使用。（也有原生的方式，也有其他库，但目前这个比较好用）
* 服务端API
	* 创建socketio连接

		```
			const server = require('http').createServer;
			const io = require('socket.io')(server);
			server.listen(3000)
		```
	* 建立客户端的连接
		```
			// connection事件用来监听是否连接上客户端
			io.on('connection', function (socket) {
				// socket就代表连上的客户端对象
			})
		```
	* 接收客户端的消息
		* socket.on(eventName, function (data) {})
	* 向客户端发送消息
		* socket.emit(eventName, data);

* 客户端API
	* 建立服务器的连接
		* const socket = io('ws://localhost:3000');
	* 向服务器发送消息
		* socket.emit(eventName, data);
	* 接收服务器的消息
		* socket.on(eventName, function (data) {});



