var express = require("express");
var router = express.Router();
const {Client, Status} = require("@googlemaps/google-maps-services-js");

//key: 'AIzaSyDVLzXVT1vBPMgHF-x3MOXQlMJiVlryDj8'

router.get("/", function(req, res, next) {
    res.send("We workin");
});

router.post('/', function(req, res, next) {
    const client = new Client({});
    console.log(req.body);
    client.placesNearby({
        params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            // key:'AIzaSyDVLzXVT1vBPMgHF-x3MOXQlMJiVlryDj8',
            query: req.body.query, //cuisine entry (make sure it's sanitized)
            radius: req.body.radius, //radius entry, 0 to 50,000 m
            minprice: 0,
            maxprice: req.body.maxPrice, // maxPrice should be 0 to 4
            language: "en",
            location: req.body.location
        },
        timeout: 1000
    }, axiosInstance)
    .then(r => {
        console.log(r.data.results[0]);
      })
      .catch(e => {
        console.log(e);
    });
});

module.exports = router;