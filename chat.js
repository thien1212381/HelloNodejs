var express = require('express');
var router = express.Router();
router.get('/chat',function(req,res,next){
  res.render('chat');
  next();
});
module.exports = router;
