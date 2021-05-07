let express = require('express');
let router = express.Router();
let request = require('request');

let Post = require('../../models/post/post_model')
let User = require('../../models/user/user_model')



router.get('allLyrics', function(req, res){
  res.redirect('/allLyrics');
});

router.get('/allLyrics', async function(req, res) {
  let entry = await Post.getAllPosts();
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
    res.render("allLyrics",{
    data: entry,
    totalposts: entry
  });
});

router.get ('/blog/:blogname', function(req, res) {
  let entry = Post.getAllPosts();
  let blogname = req.params.blogname.replace("_"," ");
    if(entry[blogname]){ 
      let post = entry[blogname]; 
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render("post/blog.ejs",{
      data: post ,
      totalposts: entry,
      blogname: blogname
    });
  }
  else{ 
    let errorCode=404;
    res.status(errorCode);
    res.setHeader('Content-Type', 'text/html');
    res.render("error.ejs", {"errorCode":errorCode ,   totalposts: entry,});
  }
});

router.get('/createBlog', function(req, res) {
    let entry = Post.getAllPosts();
    let user = User.getAllUsers();
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render("post/createBlog.ejs",{
      users: user,
      data: entry ,
      totalposts: entry
    });
});

router.get('/lyrics', function(req, res) {
    let entry = Post.getAllPosts();
    let user = User.getAllUsers();
    let title = req.query.title.trim();
    let artist = req.query.artist.trim();
    console.log(title);
    console.log(artist);
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    request("https://api.lyrics.ovh/v1/"+artist+"/"+title,  function(err,body) {
        if(!err){
          let lyricResponse = body.body;
          res.status(200);
          res.setHeader('Content-Type', 'text/html');
          res.render('lyric', {
            text: lyricResponse,
            data: entry ,
            totalposts: entry

          });

        }
        else{
          console.log("Redirecting!");
          res.redirect('/lyric');
        }

      });
});

router.put('/blog', function(req, res) {
   let entry = Post.getAllPosts();
    var id = req.body.title.trim();
    var postContent = {
        author: req.body.author.trim(),
        title: req.body.title.trim(),
        date: req.body.date.trim(),
        lyric: req.body.lyric.trim(),
        entry: req.body.entry.trim(),
        comments: []
    };
    Post.updatePosts(id, postContent);
      res.redirect('/allLyrics');


});

router.delete('/blog/:blogname', function(req, res){
  Post.deletePosts(req.params.blogname);
  res.redirect('/allLyrics');
});
module.exports = router
