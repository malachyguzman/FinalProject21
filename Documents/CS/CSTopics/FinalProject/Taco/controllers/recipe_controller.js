let express = require('express')
  , router = express.Router();
//let request = require('request');

var fs = require('fs');

let Recipes = require('../models/recipe_model')

router.get('/recipe/:recipename', async function(request, response) {
   let recipeList = await Recipes.getAllRecipes();
   let authList = await Recipes.getAuthInfo();

   //Recipes.deleteRecipe(testRecipe)

   let recipename = request.params.recipename;

   if(recipeList[recipename.replace("_"," ")]){
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("recipe/recipe",{
        allPosts: recipeList,
        validAuthors: authList,
        post: recipename.replace("_"," "),
        blog: recipeList[recipename.replace("_"," ")],
        uncut: recipename
      });

    }else{
      response.status(404);
      response.setHeader('Content-Type', 'text/html')
      response.render("error", {
        "errorCode":"404",
      });
     }
});


router.get('/createRecipe', async function(request, response) {
    let recipeList = await Recipes.getAllRecipes();
    let authList = await Recipes.getAuthInfo();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("recipe/createRecipe",{
      allPosts: recipeList,
      validAuthors: authList
    });
});


router.post('/recipe', async function(request, response) {
    let recipeList = await Recipes.getAllRecipes();

    var newRecipe = {
        author: request.body.author.trim(),
        title: request.body.title.trim(),
        date: request.body.date.trim(),
        content1: request.body.content1.trim(),
        content2: request.body.content2.trim(),
        comments: request.body.comments
    };

    console.log(newRecipe)
    //Recipes.saveRecipe(newRecipe);

    //recipeList[request.body.title.trim()] = b;
    //fs.writeFileSync('data/recipe.json', JSON.stringify(recipeList));
    response.redirect("/");
});


router.put('/recipe/:recipename', async function(req,res){
    let newRecipeData = {};
    //let id= request.body.recipename;
    // newMovieData["title"] = req.body.title;
    // newMovieData["year"]= req.body.year;
    // newMovieData["rating"]= req.body.rating;
    // newMovieData["director"]= req.body.director;
    // newMovieData["actors"]= req.body.actors;
    // newMovieData["plot"]= req.body.plot;
    // newMovieData["poster"]= req.body.poster;
    // newMovieData["showtimes"] = req.body.showtimes.split(",");

    Recipes.updateRecipe(recipename, newRecipeData);
    res.redirect('/discussion');
});



router.get('recipe/delete/:recipename', function(request, response){
  //console.log(request.params.id);
  console.log("bruh")
//  Recipes.deleteRecipe(request.params.id);
  request.redirect('/');
});


router.post('/recipe/like/:recipename/:comment', async function(request, response) {
  let recipeList = await Recipes.getAllRecipes();
  let recipename = request.params.recipename.replace("_"," ");
  let commentNum = request.params.comment;

  if(recipeList[recipename]){
      if (!recipeList[recipename].comments[commentNum].likes) recipeList[recipename].comments[commentNum].likes = 0;
      recipeList[recipename].comments[commentNum].likes++;

      fs.writeFileSync('data/recipe.json', JSON.stringify(recipeList));
      response.status(200);
      response.setHeader('Content-Type', 'text/json');
      response.send(recipeList[recipename]);
   }else{
      response.status(404);
      response.setHeader('Content-Type', 'text/json');
      response.send('{results: "no comment"}');
  }
});

router.post('/recipe/comment/:recipename', async function(request, response) {
  let recipeList = await Recipes.getAllRecipes();
  let authList = await Recipes.getAuthInfo();
  let recipename = request.params.recipename.replace("_"," ");
  let commentCount = Object.keys(blog_info[recipename].comments).length

  if(recipeList[recipename]){
      if (!recipeList[recipename].comments[commentCount]) recipeList[recipename].comments[commentCount] = "";
      recipeList[recipename].comments[commentCount]=request.body;

      fs.writeFileSync('data/recipe.json', JSON.stringify(recipeList));
      response.status(200);
      response.setHeader('Content-Type', 'text/json');
      response.send(recipeList[recipename].comments);
   }else{
      response.status(404);
      response.setHeader('Content-Type', 'text/json');
      response.send('{results: "no comment"}');
  }
});

module.exports = router
