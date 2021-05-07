var fs = require('fs');
let admin = require("firebase-admin");
let serviceAccount = require("../../firebase-config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

exports.getAllPosts = async function(){
  let allPosts = {};
  try{
    let posts = await db.collection('posts').get();

    for (post of posts.docs) {
          allPosts[post.id] = post.data();
        };
          
        return allPosts;

      } catch (err) {
        console.log('Error getting documents', err);
      }
  }



exports.getPosts = async function(id){
  try {
    let allPosts = await exports.getAllPosts();

    if (allPosts[id]) {
      return allPosts[id];
    }
  } catch (err) {
    console.log(err)
  }
}

exports.savePosts = async function(id, postContent){
  let onePost = await db.collection('posts').doc(id).get();
    onePost.set({
      author: postContent.author,
      title: postContent.title,
      date: postContent.date,
      entry: postContent.entry,
      lyric: postContent.lyric,
      comments: postContent.comments,
    });
  }


exports.updatePosts = async function(id, postContent){
  await exports.savePosts(id, postContent)
}
exports.deletePosts = function(id){
  db.collection('posts').doc(id).delete();
}
