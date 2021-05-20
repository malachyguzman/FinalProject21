var fs = require('fs');
let admin = require("firebase-admin");
let serviceAccount = require("../config/firebase-config.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
let db = admin.firestore();

//all methods work

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

exports.updateUser = async function(id, userData){
  await exports.saveUser(id, userData)
}


exports.saveUser = async function(id, newUser){
  console.log(id);
  let oneUser = await db.collection('users').doc(id);
  oneUser.set({
    name: newUser.name,
    username: newUser.username,
    password: newUser.password,
    comments: newUser.comments,
    stocksFollowing: newUser.stocksFollowing
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

exports.getFridge = async function(id){
  try {
    let allUsers = await exports.getAllUsers();

    if (allUsers[id]) {
      return allUsers[id].fridge;
    }
  } catch (err) {
    console.log(err)
  }
}
