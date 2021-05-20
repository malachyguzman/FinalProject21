var fs = require('fs');
var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase-config.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
var db = admin.firestore();


exports.getDiscussion = async function() {
  // let recipeData = JSON.parse(fs.readFileSync('data/discussion.json', 'utf8'));
  // return recipeData;

  let fullDiscussion = {};
  try{
    let discussion = await db.collection('discussion').get();

    for (discuss of discussion.docs){
      fullDiscussion[discuss.id] = discuss.data();
    }
    //console.log(fullDiscussion)
    return fullDiscussion;
  } catch(err){
      console.log('Error getting documents', err);
  }
}


exports.getAuthInfo = async function() {
  // let auth_info = JSON.parse(fs.readFileSync('data/auth.json', 'utf8'));
  // return auth_info;


  try{
    let auth_info = await db.collection('auth').doc('allowed_authors').get();
    return auth_info.data();
  } catch(err){
      console.log('Error getting documents', err);
  }
}


exports.getRecipe = async function(id) {
  var recipeData = exports.getAllRecipes();

  if (recipeData[id]) return recipeData[id];

  return {};
}


/*
let recipe = document.getElementsByTagName("h1")[0].innerText.trim().replace(" ","_");

for(let val=4; val < document.getElementsByTagName("button").length; val++){
  document.getElementsByTagName("button")[val].addEventListener('click', function(){
      let xmlhttp = new XMLHttpRequest();
      let commentNum = document.getElementsByTagName("button")[val].id.split("like_button")[1];
      // Specify details of the POST request
      xmlhttp.open("POST", "/recipe/like/"+recipe+"/"+commentNum, true);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Define the data you’d like to send to the server
      let postData = {
       "like": 1
      };
      // Make a POST request with your data in the body of the request
      xmlhttp.send(JSON.stringify(postData));
      // Do something once the Response (Good or Bad) has been received
      xmlhttp.onreadystatechange = function(data) {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
              let recipeObject=JSON.parse(xmlhttp.responseText);
              document.getElementsByTagName("span")[val-1].innerText=recipeObject.comments[commentNum].likes;
          }else{
            response.status(404);
            response.setHeader('Content-Type', 'text/json');
            response.send('{results: "no like"}');
      	  }
      }
  });
}

document.getElementById("commentSubmit").addEventListener('click', function(){
      let xmlhttp = new XMLHttpRequest();
      // Specify details of the POST request
      xmlhttp.open("POST", "/recipe/comment/"+recipe, true);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Define the data you’d like to send to the server
      let postData = {
        "content": document.getElementById("newContent").value,
        "author": document.getElementById("newName").value,
        "date": document.getElementById("newDate").value
      };
      // Make a POST request with your data in the body of the request
      xmlhttp.send(JSON.stringify(postData));
      // Do something once the Response (Good or Bad) has been received
      xmlhttp.onreadystatechange = function(data) {
          if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
              let recipeObject=JSON.parse(xmlhttp.responseText);
              let position = Object.keys(recipeObject).length-1;

            //document.getElementById("commentTag")=blogObject.comments[position]

          }else{
            response.status(404);
            response.setHeader('Content-Type', 'text/json');
            response.send('{results: "no comment"}');
      	  }
      }
});
*/



/*
exports.saveMovie = function(id, newMovie) {
  var movieData = exports.getAllMovies();
  movieData[id] = newMovie;
  fs.writeFileSync('data/data.json', JSON.stringify(movieData));
}

exports.updateMovie = function(id, movieData) {
  exports.saveMovie(id, movieData)
}

exports.deleteMovie = function(id) {
  var movieData = exports.getAllMovies();
  delete movieData[id];
  fs.writeFileSync('data/data.json', JSON.stringify(movieData));
}
*/
