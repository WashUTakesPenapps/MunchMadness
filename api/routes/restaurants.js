var express = require("express");
var router = express.Router();
// const {Client, Status} = require("@googlemaps/google-maps-services-js");
const fetch = require("node-fetch");

//Yelp API key
const key = "qfHw9wZLuqGmCH3cKcADSwArEbdGBXmfO8knM3oCGoSfwVmLRNzdI5AC_0KzGURK_-rJe2QO35GZtuJWWM4oUTBafJ7oJguJNGHBe1mzKvS_cP-C2kKhJPt-7xi3XnYx";


router.get("/", function(req, res, next) {
    res.send("We workin");
});

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
    url = url + "&price=" + price + "&open_now=true";

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
        console.log(res);
        //getting the business ids of the restaurants we got
        var business_ids = Array(res.total);
        for (i=0; i < res.total; ++i) {
            business_ids.push(res.businesses[i].id);
        }
        //need to be added to firebase
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