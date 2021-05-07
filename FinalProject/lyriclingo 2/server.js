//..............Include Express..................................//
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
//..............Create an Express server object..................//
const app = express();
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded());
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(require('./controllers/post/post_controller'));
app.use(require('./controllers/user/user_controller'));
let Post = require('./models/post/post_model')
let User = require('./models/user/user_model')
///index
app.get('/', async function(request, response) {
  let posts = await Post.getAllPosts();
  let entry = JSON.parse(fs.readFileSync('data/content.json', 'utf8'));
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  for (key in entry){
  let peter = entry[key];
}
  response.render("index",{
    data: entry,
    totalposts: entry
  });
});

app.get('/lyric', function(request, response) {
  let entry = JSON.parse(fs.readFileSync('data/content.json', 'utf8'));
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  for (key in entry){
  let peter = entry[key];
}
  response.render("lyric",{
    data: entry,
    totalposts: entry
  });
});


app.post('/blog/likes/:blogname', function(request, response) {
  let entry = JSON.parse(fs.readFileSync('data/content.json'));
  let blogname = request.params.blogname.replace("_"," ");


  if(entry[blogname]){
    if (!entry[blogname].comments.likes) entry[blogname].comments.likes = 0;
    entry[blogname].comments.likes++;
    fs.writeFileSync('data/content.json', JSON.stringify(entry));

    response.status(200);
    response.setHeader('Content-Type', 'text/json');
    response.send(entry[blogname]);

  }

});


app.post('/blog/comment/:blogname', function(request, response) {
  console.log(request.params.blogname);
  let entry = JSON.parse(fs.readFileSync('data/content.json'));
  let blogname = request.params.blogname;
  if(entry[blogname]){
    if (!entry[blogname].comments) entry[blogname].comments = [];

    let c = {
      author: request.body.author.trim(),
      date: request.body.date.trim(),
      content: request.body.content.trim(),
      likes: 0
    }
    entry[blogname].comments.push(c)
    fs.writeFileSync('data/content.json', JSON.stringify(entry));

    response.status(200);
    response.setHeader('Content-Type', 'text/json');
    console.log(entry[blogname]);
    response.send(JSON.stringify(entry[blogname]));

  }else{
    response.status(404);
    response.setHeader('Content-Type', 'text/json');
    response.send('[]');
  }

});


// Because routes/middleware are applied in order, this will act as a default error route in case of an invalid route
app.use("", function(request, response){
  let entry = JSON.parse(fs.readFileSync('data/content.json'));
  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    "errorCode":"404",
    totalposts: entry
  });
});




//..............Start the server...............................//
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Easy server listening for requests on port ' + port + '!');
  console.log('Visit http://localhost:'+port+' to see the website.')
});
