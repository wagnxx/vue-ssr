// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : '192.168.1.112',
//   user     : 'root',
//   password : '123456',
//   database : 'RUNOOB'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

var mysql = require('mysql');
//填写数据库连接信息，可查询数据库详情页
var username = 'root';
var password = 'root';
var db_host = '192.168.1.112';
var db_port = 3306;
var db_name = 'RUNOOB';
var option = {
  host: db_host,
  port: db_port,
  user: username,
  password: password,
  database: db_name,
};

// const { MYSQL_CONF } = require('../conf/db')

// 创建链接对象
const con = mysql.createConnection(option);

// 开始链接
con.connect();

// 统一执行 sql 的函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
  return promise;
}

module.exports = {
  exec,
  escape: mysql.escape,
};

function test() {
  let now = Date.now();
  var query = `
  INSERT INTO runoob_tbl VALUES ( 0 , "学习 NodeJS" ,"菜鸟教程"  ,   "2020-8-22"  )
  `;

  var find = `select * from runoob_tbl where runoob_title="学习 NodeJS"`;
  exec(find).then((res) => {
    if (res.length > 0) {
      console.log('已存在', res);
      return;
    }
    exec(query).then((data) => {
      console.log('test sql data length,dta', data.length, data);
    });
  });
}

test();
