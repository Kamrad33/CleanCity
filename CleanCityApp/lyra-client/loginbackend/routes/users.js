var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({

    host:'localhost',
    port:'3306',
    user:'root',
    password:'root', //empty for window
    database: 'cleancity_db'

});
con.connect(function(error){
  if(error) console.log(error);
  else console.log("connected");
});
/* GET users listing. */
router.post('/', function(req, res, next) {
    var login = req.body.login;
    var password = req.body.password;
    con.query("SELECT * FROM user WHERE login = ? AND password = ? ",
    [login, password], function(err, row, fields) {
      if (err) {
         console.log(err);
          res.send({'success': false, 'message': 'Нет коннекта'});
        }
      if (row.length > 0){
        res.send({'success': true, 'user': row[0].login});
      } else {
        res.send({'success': false, 'message': 'Неправильный логин или пароль'});
      }
    });

});

module.exports = router;
