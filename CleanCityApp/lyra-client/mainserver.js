var express = require('express');
var app  = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({

    host:'localhost',
    port:'3306',
    user:'root',
    password:'root', //empty for window
    database: 'cleancity_db'

});

var server = app.listen(1348, function(){
  var host = server.address().address
 var port = server.address().port
  console.log("start");

});

con.connect(function(error){
  if(error) console.log(error);
  else console.log("connected");
});

router.post('/login', function(req, res, next) {
  var login = req.body.login;
    var password = req.body.password;
    connection.query("select * from user where login = ? and password = ?", [login, password], function(err, row, fields) {
      if (err) console.log(err);
      if (row.length > 0){
        res.send({'success': true, 'message': row[0].login});
      } else {
        res.send({'success': false, 'message': 'User not found'});
      }
    });

});

app.get('/user', function(req, res){
  con.query('select * from user', function(error, rows, fields){
        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  })
});
app.get('/new', function(req, res){
  con.query('insert into users (name) values ("oleg")', function(error, rows, fields){
        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  });
});
app.get('/clear', function(req, res){
  con.query('delete from users where name = "oleg" ', function(error, rows, fields){
        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  });
});

module.exports = router;
