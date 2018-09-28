const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'wish'
});

connection.connect(err => {
	if (err) {
		console.log(err.stack);
		return;
	}
	console.log(`数据库连接成功 ID为${connection.threadId}`);
});

module.exports = connection;