var express = require("express");
var bodyParser = require('body-parser')
var app = express();

app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//use router
app.use(require('./user'));

//start server
app.listen(3000,function(){
});
