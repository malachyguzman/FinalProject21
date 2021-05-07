let express = require('express')
let router = express.Router();
let request = require('request');
let User = require('../../models/user/user_model')



router.get('/createUser', async function(req, res) {
    let entry = await User.getAllUsers();
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render("user/createUser",{
      data: entry ,
      totalposts: entry
    });
});

router.post('/user',function(req, res) {
  var id = req.body.name.trim();
  var content = {
        name: req.body.name.trim(),
        username: req.body.username.trim(),
        birthday: req.body.birthday.trim(),
        email: req.body.email.trim(),
        genre: req.body.genre.trim(),

    };
    User.updateUser(id, content);
  
    res.redirect("/");
});


module.exports = router
