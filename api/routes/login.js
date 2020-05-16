var express = require('express');
var router = express.Router();

//gets firebase info from client info
var fireApp = require('../../client/src/services/firebase');
const database = fireApp.Firebase.firestore();

router.post('/', async function(req,res){
  console.log('attempting to login...');
  console.log(req.body);
  var user = req.body.username;
  var pass = req.body.password;
  if(user === '' || pass === ''){
    console.log('missing username or password');
    return;
  }
  //checking if username exists
  var goodLogin = false;
  database.collection('user-info').where('username', '==', user).where('password','==',pass)
    .get()
    .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        console.log('password matches for username: ',user)
        goodLogin = true;
      })
      if(goodLogin){
        res.send(true)
      }
      else{
        res.send(false)
      }
    })
    .catch(function(e){
      console.error('error logging in: ',e);
    })
})

module.exports = router;