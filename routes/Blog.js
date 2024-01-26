var express = require('express');
var router = express.Router();
const path = require('path');

var bloggers=new Map()


router.get('/*',function(req, res) {
  req.session.name = undefined
  res.sendFile(path.join(__dirname,'../','/public', '/blog.html'));
   
  
});

router.post('/list', function(req, res, next) {
  
 
  if(req.body.Username){
    let User=req.body.Username

    if(!bloggers.has(User)){
      bloggers.set(User,{id: req.sessionID,username: User,entries: []})
    }else{
      bloggers.get(User).id = req.sessionID
    }
    req.session.map = bloggers
    req.session.name = User
  }
  if(!req.session.name){
    res.redirect("/blog/login")
    return;
  }
    res.render('UserList', { title: 'Bloggers' , bloggersJS: bloggers });
});

router.post('/username', function(req, res, next) {
  if(!req.session.name){
    res.redirect("/blog/login")
    return;
  }
  if(req.body.entry){
    bloggers.get(req.session.name).entries.push(req.body.entry)
  }
  
  res.render('User', { title: req.body.user, entriesJS: bloggers.get(req.body.user).entries, user: req.session.name });
});




module.exports = router;
