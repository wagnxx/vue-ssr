const { exec } = require('../config/mysql.db');

const books = {
  list() {
    let query = `select a.*,b.runoob_count from runoob_tbl a right join tcount_tbl b on a.runoob_author=b.runoob_author;
        `;
    return exec(query);
  },

  getAuthorList(str) {
    let query = `select * from tcount_tbl ;
        `;
    return exec(query);
  },

  addAuthor(str) {
    let find = `select * from tcount_tbl WHERE runoob_author="${str}"`;
    let query = `INSERT INTO  tcount_tbl VALUES ("${str}",0);
        `;

    exec(find).then((res) => {
      if (res.length) {
        return '已存在';
      }
      return exec(query);
    });
  },

  add(str) {
    let query = `INSERT INTO product_tbl VALUES ( ${str} )`;

    return exec(query);
  },
  del({ where }) {
    let query = `DELETE product_tbl where ${obj2String(where)} )`;
    return exec(query);
  },
  update({ where, setMap }) {
    let query = `UPDATE product_tbl set  ( ${obj2String(
      setMap
    )} where ${obj2String(where)} )`;
    return exec(query);
  },
  find({ where, fieldsMap }) {
    let query = `select ${obj2String(fieldsMap)} product_tbl where ${obj2String(
      where
    )} )`;
    return exec(query);
  },
};

function obj2String(obj) {}

exports.books = books;

/**

mysql> select * from runoob_tbl;
+-----------+---------------+---------------+-----------------+
| runoob_id | runoob_title  | runoob_author | submission_date |
+-----------+---------------+---------------+-----------------+
|         1 | 学习 PHP      | 菜鸟教程      | 2017-04-12      |
|         2 | 学习 MySQL    | 菜鸟教程      | 2017-04-12      |
|         3 | 学习 Java     | RUNOOB.COM    | 2015-05-01      |
|         4 | 学习 Python   | RUNOOB.COM    | 2016-03-06      |
|         5 | 学习 C        | FK            | 2017-04-05      |
+-----------+---------------+---------------+-----------------+
5 rows in set (0.00 sec)

mysql> select * from  tcount_tbl;
+---------------+--------------+
| runoob_author | runoob_count |
+---------------+--------------+
| 菜鸟教程      |           10 |
| RUNOOB.COM    |           20 |
| Google        |           22 |
+---------------+--------------+
3 rows in set (0.00 sec)

mysql> select a.*,b.runoob_count from runoob_tbl a right join tcount_tbl b on a.runoob_author=b.runoob_author;
+-----------+---------------+---------------+-----------------+--------------+
| runoob_id | runoob_title  | runoob_author | submission_date | runoob_count |
+-----------+---------------+---------------+-----------------+--------------+
|         1 | 学习 PHP      | 菜鸟教程      | 2017-04-12      |           10 |
|         2 | 学习 MySQL    | 菜鸟教程      | 2017-04-12      |           10 |
|         3 | 学习 Java     | RUNOOB.COM    | 2015-05-01      |           20 |
|         4 | 学习 Python   | RUNOOB.COM    | 2016-03-06      |           20 |
|      NULL | NULL          | NULL          | NULL            |           22 |
+-----------+---------------+---------------+-----------------+--------------+
5 rows in set (0.00 sec)


mysql> select a.*,b.runoob_count from runoob_tbl a right join tcount_tbl b on a.runoob_author=b.runoob_author;
+-----------+---------------+---------------+-----------------+--------------+
| runoob_id | runoob_title  | runoob_author | submission_date | runoob_count |
+-----------+---------------+---------------+-----------------+--------------+
|         1 | 学习 PHP      | 菜鸟教程      | 2017-04-12      |           10 |
|         2 | 学习 MySQL    | 菜鸟教程      | 2017-04-12      |           10 |
|         3 | 学习 Java     | RUNOOB.COM    | 2015-05-01      |           20 |
|         4 | 学习 Python   | RUNOOB.COM    | 2016-03-06      |           20 |
|      NULL | NULL          | NULL          | NULL            |           22 |
+-----------+---------------+---------------+-----------------+--------------+
5 rows in set (0.00 sec)



*/
