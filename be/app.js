const { v4: uuidv4 } = require('uuid');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/upload', function(req, res) {
  const files = req.files.test;
  files.map(file => {
    const extension = file.mimetype.split('/')[1];
    file.mv(__dirname + `/files/${uuidv4()}.${extension}`, function(err) {
      if (err) return res.status(500).send(err);
    });
  });
  res.status(200).send('File uploaded!');
});

module.exports = app;
