var fs = require('fs');
let admin = require("firebase-admin");
let serviceAccount = require("../../firebase-config.json");
let db = admin.firestore();


exports.getAllUsers = async function(){

    let allUsers = {};

    try {
      let users = await db.collection('users').get();

      for (user of users.docs) {
        allUsers[user.id] = user.data();
      };

      return allUsers;
    } catch (err) {
      console.log('Error getting documents', err);
    }
}

exports.updateUser = function(id, userData){
  exports.saveUser(id, userData)
}

exports.saveUser = async function(id, newUser){
  let oneUser = await db.collection('users').doc(id);
  oneUser.set({
    name: newUser.name,
    username: newUser.username,
    birthday: newUser.birthday,
    email: newUser.email,
    genre: newUser.genre,
  });
}


exports.deleteUser = function(id){
  db.collection('users').doc(id).delete();
}

exports.getUser = async function(id){
  try {
    let allUsers = await exports.getAllUsers();

    if (allUsers[id]) {
      return allUsers[id];
    }
  } catch (err) {
    console.log(err)
  }
}
