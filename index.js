var express = require("express");
var app = express();

var bodyParser = require('body-parser')


app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//use router
app.use(require('./user'));
app.use(require('./chat'));

//start server
const server = app.listen(3000,function(){
});
var io = require("socket.io")(server);

io.on('connection', function(socket){
  console.log('hello: ');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
