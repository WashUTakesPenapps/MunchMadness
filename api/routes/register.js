var express = require('express');
var router = express.Router();

//firebase integration
var firebase = require('firebase/app');
require('firebase/firestore')
// var firebaseConfig = {
//   apiKey: "AIzaSyDmmROengKXvPdrG3qsQ505C10yImnZ0Tk",
//   authDomain: "munch-madness-d2573.firebaseapp.com",
//   databaseURL: "https://munch-madness-d2573.firebaseio.com",
//   projectId: "munch-madness-d2573",
//   storageBucket: "munch-madness-d2573.appspot.com",
//   messagingSenderId: "657051909764",
//   appId: "1:657051909764:web:c52e717e3995815af0ccd1",
//   measurementId: "G-3TDV966TLE"
// };

// Initialize Firebase
//var fireApp = firebase.initializeApp(firebaseConfig);
//var database = firebase.firestore(fireApp);
var database = firebase.firestore();
//gets register data from a person and sends it to firebase
router.post('/', function(req, res){
  console.log('attempting to register...')
  try{
    console.log(req.body)
    var user = req.body.username
    var pass = req.body.password
    if(user === "" || pass === "") {
      console.log('missing username or password');
      return
    }
    //checking if username already exists
    var doesExist = false //flag for username in DB
    database.collection('user-info').where('username','==',user)
      .get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          console.log('username: ',user,' already exists, use a different one')
          console.log('found at: ',doc.id)
          doesExist = true
        })
      })
      //runs if the username isn't in DB already
      .then(function(){ 
        if(!doesExist)
        database.collection('user-info').add({
          username: user,
          password: pass
        })
        //fxn to return id of new acct
        .then(function(docRef){
          console.log('user: ',user, 'successfully registered under ',docRef.id)
        })
        //error with adding to DB
        .catch(function(error){
          console.error('error adding document: ',error)
        })
      })
      //error with querying from DB
      .catch(function(error){
        console.error('error getting document: ',error)
      })
  }
  catch (err) {
    res.status(400).json({
      message: 'Error registering',
      err
    });
  }
})


module.exports = router;