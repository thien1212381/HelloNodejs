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

var users=[];
io.on('connection', function(socket){

  var username='';

  socket.emit('request-user',{message: 'Please enter username: '});

  socket.on('add-user',function(data){
    if(users.indexOf(data.username) == -1){
      username = data.username;
      users.push(data.username);
      console.log(username+' has connected!');
      io.emit('sayhello',{username: data.username});
    }
    else {
      socket.emit('request-user',{message: 'Username Already Exists\nPlease enter different username: '});
    }
  });

  socket.on('is-typing', function (data) {
    socket.broadcast.emit('typing', {
      username: data.username
    });
  });

  socket.on('stop-typing', function (data) {
    socket.broadcast.emit('stop-typing', {
      username: data.username
    });
  });

  socket.on('send-message', function(data){
    io.emit('send-message', {message: data.message,username: data.username});
  });

  socket.on('disconnect',function(){
    console.log(username+' has disconnected!');
    socket.broadcast.emit('stop-typing', {username: username});
    users.splice(users.indexOf(username),1);
    io.emit('remove-user',{message: ' has left!',username:username});
  })

});
