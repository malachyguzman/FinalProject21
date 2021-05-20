let express = require('express')
  , router = express.Router();
let fs = require('fs')
let request = require('request');
let Recipe = require('../models/recipe_model');
let Discussion = require('../models/discussion_model');
let User = require('../models/user_model');

function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

router.get('/user/fridge', function(req, res){
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.render('user/update_fridge.ejs');
});

router.post('/user', async function(req, res) {
    let ingredientsUnordered = req.body.ingredients.split(", ");
    let ingredientsOrdered = ingredientsUnordered.sort();
    console.log(ingredientsOrdered);

    db.collection('users').doc(req.body.username).update({
      ingredients: ingredientsOrdered
    });

    // db.collection('users').doc(req.body.username).ingredients.update(ingredientsOrdered);

    res.redirect("/");
});

router.get('/user/ingredientEdit', loggedIn, async function(request, response, next) {
  try {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("user/ingredientEdit");

  } catch (error) {
    response.redirect('/error?code=500');
  }
});



module.exports = router
