const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const mime = require('mime');
const template = require('art-template');
const moment = require('moment');
const connection = require('./model/db');

const server = http.createServer();

// 设置模板路径
template.defaults.root = path.join(__dirname, 'views');

// 更改默认模板后缀
template.defaults.extname = '.html';

// 模板变量
template.defaults.imports.moment = moment;

// 当客户端发送请求时, 执行回调函数
server.on('request', (req, res) => {

	// 渲染并响应模板到客户端
	res.render = (path, data) =>  {
		// 设置响应头
		res.writeHead(200, {
			'Content-Type': 'text/html;charset=utf8'
		});
		// 响应客户端请求
		res.end(template(path, data))
	};

	// 获取客户端请求路径
	let {pathname, query} = url.parse(req.url, true);

	// 判断用户是否请求的是首页内容
	if (pathname == '/' || pathname == '/index') {
		// 查询数据库中的愿望数据
		connection.query('select * from list', (err, data) => {
			// 如果查询出现错误
			if (err) {
				res.render('error', {err: err.stack});
				return;
			}
			// 使用愿望数据渲染模板
			res.render('index', {data: data});
		});

		// 添加愿望请求
	} else if (pathname == '/createWish') {

		// 设置响应头
		res.writeHead(200, {'Content-Type': 'application/json'});
		// 获取前台传递过来的参数
		let {username, content} = query;
		// 判断用户是否传递了需要的参数
		if (username && content) {
			// 添加愿望的当前时间
			query.publishDate = new Date();
			// 将数据存储进数据库
			connection.query('insert into list set ?', query, err => {
				// 发生错误 愿望添加失败
				if (err) {
					res.end(JSON.stringify({code: 300, message: '愿望添加失败'}))
					return;
				}
				// 添加愿望成功
				res.end(JSON.stringify({code: 200, message: '愿望添加成功', result: query}));
			});
		} else {
			// 前端没有传递参数
			res.end(JSON.stringify({code: 400, message: '请填写愿望'}))
		}
	} else {
		// 拼接静态资源路径
		pathname = path.join(__dirname, 'public', pathname);
		// 读取文件
		fs.readFile(pathname, (err, data) => {
			if (!err) {
				// 设置响应头
				res.writeHead(200, {
					'Content-Type': mime.getType(pathname)
				});
				// 响应数据
				res.end(data);
			}else {
				// 设置响应头
				res.writeHead(404);
				// 结束请求
				res.end();
			}
		});
	}

});

server.listen(3000);