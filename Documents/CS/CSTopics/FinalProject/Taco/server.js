var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var app = express();
var methodOverride = require('method-override');


//..............Apply Express middleware to the server object....//
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//.............Define server routes..............................//

let Recipes = require('./models/recipe_model')

app.get('/', async function(request, response) {
  let recipeList = await Recipes.getAllRecipes();

  //console.log(recipeList)

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index",{
    data: recipeList,
    allPosts: recipeList
  });
});

app.get('/about', function(request, response) {
  let recipeList = Recipes.getAllRecipes();
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("about",{
    data: recipeList,
    allPosts: recipeList
  });
});


app.use(require('./controllers/recipe_controller'));
app.use(require('./controllers/discussion_controller'));

/*
app.get('/', function(request, response) {
  let blog_info = JSON.parse(fs.readFileSync('data/recipe.json', 'utf8'));
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index",{
    data: blog_info,
    allPosts: blog_info
  });
});


app.get('/about', function(request, response) {
  let blog_info = JSON.parse(fs.readFileSync('data/recipe.json', 'utf8'));
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("about",{
    data: blog_info,
    allPosts: blog_info
  });
});

app.get('/discussion', function(request, response) {
  let blog_info = JSON.parse(fs.readFileSync('data/recipe.json', 'utf8'));
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("discussion/maindiscussion",{
    data: blog_info,
    allPosts: blog_info
  });
});


app.get('/recipe', function(request, response) {
  let blog_info = JSON.parse(fs.readFileSync('data/recipe.json', 'utf8'));
  let auth_info = JSON.parse(fs.readFileSync('data/auth.json', 'utf8'));
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("recipe/recipe",{
    allPosts: blog_info,
    validAuthors: auth_info
  });
});


app.get('/recipe/:recipename', function(request, response) {
  let blog_info = JSON.parse(fs.readFileSync('data/recipe.json', 'utf8'));
  let auth_info = JSON.parse(fs.readFileSync('data/auth.json', 'utf8'));
  let recipename = request.params.recipename.replace("_"," ");

 if(blog_info[recipename]){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("recipe/recipe",{
      allPosts: blog_info,
      post: recipename,
      blog: blog_info[recipename],
      validAuthors: auth_info
    });
  }else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404",
    });
   }
});


app.get('/createRecipe', function(request, response) {
    let blog_info = JSON.parse(fs.readFileSync('data/recipe.json', 'utf8'));
    let auth_info = JSON.parse(fs.readFileSync('data/auth.json', 'utf8'));
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("recipe/createRecipe",{
      allPosts: blog_info,
      validAuthors: auth_info
    });
});

app.get('/recipe', function(request, response) {
    let author = request.query.name;
    let title = request.query.title;
    let blog_info = JSON.parse(fs.readFileSync('data/recipe.json', 'utf8'));
    response.redirect("/recipe/"+title);
});

app.post('/recipe', function(request, response) {
    let blog_info = JSON.parse(fs.readFileSync('data/recipe.json', 'utf8'));

    var b = {
        author: request.body.author.trim(),
        title: request.body.title.trim(),
        date: request.body.date.trim(),
        content1: request.body.content1.trim(),
        content2: request.body.content2.trim(),
        comments: request.body.comments
    };

    blog_info[request.body.title.trim()] = b;
    fs.writeFileSync('data/content.json', JSON.stringify(blog_info));
    response.redirect("/");
});

app.post('/recipe/like/:recipename/:comment', function(request, response) {
  let blog_info = JSON.parse(fs.readFileSync('data/recipe.json', 'utf8'));
  let recipename = request.params.recipename.replace("_"," ");
  let commentNum = request.params.comment;

  if(blog_info[recipename]){
      if (!blog_info[recipename].comments[commentNum].likes) blog_info[recipename].comments[commentNum].likes = 0;
      blog_info[recipename].comments[commentNum].likes++;

      fs.writeFileSync('data/recipe.json', JSON.stringify(blog_info));
      response.status(200);
      response.setHeader('Content-Type', 'text/json');
      response.send(blog_info[recipename]);
   }else{
      response.status(404);
      response.setHeader('Content-Type', 'text/json');
      response.send('{results: "no comment"}');
  }
});

app.post('/recipe/comment/:recipename', function(request, response) {
  let blog_info = JSON.parse(fs.readFileSync('data/recipe.json', 'utf8'));
  let auth_info = JSON.parse(fs.readFileSync('data/auth.json', 'utf8'));
  let recipename = request.params.recipename.replace("_"," ");
  let commentCount = Object.keys(blog_info[recipename].comments).length

  if(blog_info[recipename]){
      if (!blog_info[recipename].comments[commentCount]) blog_info[recipename].comments[commentCount] = "";
      blog_info[recipename].comments[commentCount]=request.body;

      fs.writeFileSync('data/recipe.json', JSON.stringify(blog_info));
      response.status(200);
      response.setHeader('Content-Type', 'text/json');
      response.send(blog_info[recipename].comments);
   }else{
      response.status(404);
      response.setHeader('Content-Type', 'text/json');
      response.send('{results: "no comment"}');
  }
});

*/
// Because routes/middleware are applied in order, this will act as a default error route in case of an invalid route
app.use("", function(request, response){
  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    "errorCode":"404",
    });
});



//..............Start the server...............................//
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Easy server listening for requests on port ' + port + '!');
  console.log('Visit http://localhost:'+port+' to see the website.')
});
