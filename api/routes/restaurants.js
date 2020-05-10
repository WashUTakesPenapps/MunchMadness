var express = require("express");
var router = express.Router();
// const {Client, Status} = require("@googlemaps/google-maps-services-js");
const fetch = require("node-fetch");
// var firebase = require('firebase');
var fireApp = require('../../client/src/services/firebase');

// should think of a way to have this in one file and just include it 
//in different places!
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: "munch-madness-d2573.firebaseapp.com",
//     databaseURL: "https://munch-madness-d2573.firebaseio.com",
//     projectId: "munch-madness-d2573",
//     storageBucket: "munch-madness-d2573.appspot.com",
//     messagingSenderId: "657051909764",
//     appId: "1:657051909764:web:c52e717e3995815af0ccd1",
//     measurementId: "G-3TDV966TLE"
//   };
// firebase.initializeApp(firebaseConfig);
// var firestore = firebase.firestore();
console.log(fireApp);
// var Firebase = fireApp.Firebase;
const firestore = fireApp.Firebase.firestore();

//Yelp API key
const key = "qfHw9wZLuqGmCH3cKcADSwArEbdGBXmfO8knM3oCGoSfwVmLRNzdI5AC_0KzGURK_-rJe2QO35GZtuJWWM4oUTBafJ7oJguJNGHBe1mzKvS_cP-C2kKhJPt-7xi3XnYx";

// get restaurants based on cuisine, radius, price, and open now
router.post('/', function(req, res, next) {
    console.log(req.body);
    var url = "https://api.yelp.com/v3/businesses/search?term=food&location=" + req.body.location;
    url = url + "&radius=" + req.body.radius + "&categories=" + req.body.cuisine;
    var price = "";
    for(i=1; i < req.body.price; ++i) {
        price += toString(i) + ",";
    }
    price += req.body.maxPrice;
    url = url + "&price=" + price + "&open_now=true&sort_by=distance&limit=8";

    var bearer = 'Bearer ' + key;

    fetch(url, {
        method: "GET",
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        //getting the business ids of the restaurants we got
   
        // !!! just storing 8 restaurant ids!! can change later if want
        console.log(res);
        var business_ids = Array(8);
        
        for (i=0; i < 8; ++i) {
            business_ids[i] = res.businesses[i].id;
        }
        return business_ids;
        
    })
    .then(res => {
        // adds the business ids to firebase
        firestore.collection("restaurants/groups_from_yelp/business_ids").add({
            user: "",
            ids: res
        });
    })
    .catch(error => console.error('Error:', error))

    // const client = new Client({});
    // console.log(req.body);
    // var location = req.body.location;
    // client.findPlace({
    //     params: {
    //         key: process.env.GOOGLE_MAPS_API_KEY,
    //         input: req.body.query, //cuisine entry (make sure it's sanitized)
    //         inputtype: "textquery",
    //         point: req.body.location,
    //         circle: req.body.radius, //radius entry, 0 to 50,000 m
    //         fields: "name"
            
    //         // minprice: 0,
    //         // maxprice: req.body.maxPrice, // maxPrice should be 0 to 4
    //         // language: "en"
    //     },

    //     timeout: 1000
    // })
    // .then(r => {
    //     console.log(r.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    // });
});

module.exports = router;