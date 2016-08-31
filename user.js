var express = require('express');
var router = express.Router();

var listItem = [
  {id:1,name:"Nguyen Van A"},
  {id:2,name:"Nguyen Van B"},
  {id:3,name:"Nguyen Van C"}
]
router.get('/',function(req,res){
  console.log("New connection");
  res.render('index',{ list: listItem });
});

router.post('/add',function(req,res){
  var un = req.body.username;
  listItem.push({
    id: listItem.length +1,
    name: un
  });
  console.log("Adding: "+un);
  res.redirect('/');
});

router.get('/remove/:id',function(req,res){
  var id = req.params.id;
  console.log("Remove: "+listItem[parseInt(id)-1].name);
  delete listItem[parseInt(id)-1];
  res.redirect('/');
});

module.exports = router;
