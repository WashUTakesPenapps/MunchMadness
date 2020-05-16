var express = require('express');
var router = express.Router();

//gets firebase info from client info
var fireApp = require('../../client/src/services/firebase');
const database = fireApp.Firebase.firestore();

//gets register data from a person and sends it to firebase
router.post('/', async function(req, res){
  console.log('attempting to register...');
  try{
    console.log(req.body);
    var user = req.body.username;
    var pass = req.body.password;
    if(user === "" || pass === "") {
      console.log('missing username or password');
      return;
    }
    //checking if username already exists
    var doesExist = false; //flag for username in DB
    database.collection('user-info').where('username','==',user)
      .get()
      .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          console.log('username: ',user,' already exists, use a different one');
          console.log('found at: ',doc.id);
          doesExist = true;
          res.send(false)
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
          res.send(true)
        })
        //error with adding to DB
        .catch(function(error){
          console.error('error adding document: ',error)
          res.send(false)
        })

      })
      //error with querying from DB
      .catch(function(error){
        console.error('error getting document: ',error)
        res.send(false)
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