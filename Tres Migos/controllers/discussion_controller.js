let express = require('express')
  , router = express.Router();
//let request = require('request');

var fs = require('fs');

let Recipes = require('../models/recipe_model')
let Discussion = require('../models/discussion_model')


router.get('/discussion', async function(request, response) {

    let discussList = await Discussion.getDiscussion();
    let recipeList = await Recipes.getAllRecipes();
    let authList = await Discussion.getAuthInfo();

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("discussion/maindiscussion.ejs",{
      user: request.user,
      allPosts: recipeList,
      validAuthors: authList,
      discussion: discussList
    });
});


router.get('/discussion/createDiscussion', async function(request, response) {
    let recipeList = await Recipes.getAllRecipes();
    let authList = await Discussion.getAuthInfo();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("discussion/createDiscussion",{
      user: request.user,
      allPosts: recipeList,
      validAuthors: authList
    });
});


router.post('/discussion', async function(request, response) {
    let discussList = await Discussion.getDiscussion();
    let authList = await Discussion.getAuthInfo();

    var d = {
        author: request.body.author.trim(),
        date: request.body.date.trim(),
        content: request.body.content.trim(),
        likes: 0,
        replies: {}
    };

    discussList[request.body.title.trim()] = d;
    fs.writeFileSync('data/discussion.json', JSON.stringify(discussList));
    response.redirect("/discussion");
});



router.delete('/discussion/:id', async function(req, res){
  console.log(req.params.id);
  Discussion.deleteMovie(req.params.id);
  res.redirect('/discussion');
});


module.exports = router
