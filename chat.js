var chatModel = require('./chatModel');

module.exports = function(app,io){
  app.get('/chat',function(req,res,next){
    chatModel.find({}, function(err,results){
      if(err)
        console.log(err);
      console.log(results);
      res.render('chat',{data : results});
      next();
    })
  });

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
      var chatData = new chatModel({
        user: data.username,
        message: data.message
      });
      chatData.save(function(err){
        if(err)
          console.log(err);
        console.log("new user add");
      })
    });

    socket.on('disconnect',function(){
      console.log(username+' has disconnected!');
      socket.broadcast.emit('stop-typing', {username: username});
      users.splice(users.indexOf(username),1);
      io.emit('remove-user',{message: ' has left!',username:username});
    })

  });
}
