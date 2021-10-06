var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { exec } = require('../config/mysql.db');
const { books } = require('../service/books');
const { SuccessModel, ErrorModel } = require('../model/resModel');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/sql', function(req, res) {
  books
    .list()
    .then((data) => {
      res.send(new SuccessModel(data));
    })
    .catch((err) => {
      res.send(new ErrorModel('服务查询错误'));
    });
});
router.get('/getAuthorList', function(req, res) {
  books
    .getAuthorList()
    .then((data) => {
      res.send(new SuccessModel(data));
    })
    .catch((err) => {
      res.send(new ErrorModel('服务查询错误'));
    });
});

// define the about route
router.get('/list', function(req, res) {
  var readStream = fs.createReadStream(
    path.join(__dirname, '../../', 'public/runoob-mysql-join-test.sql')
  );
  res.setHeader('Content-type', 'html,charset=utf-8');
  res.write('<pre>');

  readStream.on('data', (chunk) => {
    res.write(chunk);
  });

  readStream.on('end', function(chunk) {
    var content = '</pre>';
    res.write(content);
  });
});

module.exports = router;
