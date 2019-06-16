var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.post('/addmarker', function(req, res, next){
  var lastLat = req.body.lastLat;
  var lastLong = req.body.lastLong;

  con.query("insert into location (xvalue, yvalue, entry_id ) values (?, ?, 7)", [lastLat, lastLong], function(error, rows, fields){

        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  })
});

app.post('/entry/list', function(req, res, next){
  con.query("select entry.id, entry.name, entry.description,  entry.status,  location.xvalue, location.yvalue from entry inner join location on entry.location_id = location.id ",  function(error, rows, fields){

        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  })
});

app.post('/entry/listnew', function(req, res, next){
  con.query("select entry.id, entry.name, entry.description,  entry.status,  location.xvalue, location.yvalue, location.entry_id from entry inner join location on entry.location_id = location.entry_id ",  function(error, rows, fields){

        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  })
});

app.post('/sign-up', function(req, res, next){
  var name = req.body.name;
  var surname = req.body.surname;
  var patronymic = req.body.patronymic;
  var login = req.body.login;
  var password = req.body.password;
  var email = req.body.email;
  con.query("INSERT INTO user ( name, surname, patronymic, login, password, email ) VALUES (?,?,?,?,?,?) ", [name, surname, patronymic, login, password, email],  function(error, rows, fields){

        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  })
});


app.post('/accept', function(req, res, next){

  var status = req.body.status;
  con.query("UPDATE entry SET status='accepted'", [status],  function(error, rows, fields){

        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  })
});

app.post('/denied', function(req, res, next){

  var status = req.body.status;
  con.query("UPDATE entry SET status='denied'", [status],  function(error, rows, fields){

        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  })
});

app.post('/addproblem', function(req, res, next){
var entryName = req.body.entryName;
  var description = req.body.description;
  con.query("INSERT INTO entry ( name, description, status, deleted, user_id, entrytype_id, rating_id ) VALUES (?,?,'notacepted',0,1,1,1)", [entryName,description],  function(error, rows, fields){

        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  })
});


/*app.post('/entry/marker', function(req, res, next){
    var entryId = req.body.entryId;
  con.query("select xvalue, yvalue  from location where entry_id = ? ", [entryId],  function(error, rows, fields){

        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  })
});
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
