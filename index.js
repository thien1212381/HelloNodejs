var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var server = app.listen(3000);
var io = require("socket.io")(server);
var db = require('./db');

app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//use router middleware
var chat = require('./chat');
chat(app,io);
app.use(chat);
