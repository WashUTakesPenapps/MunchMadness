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
    var location = req.body.location;
    client.findPlaceFromText({
        params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            input: req.body.query, //cuisine entry (make sure it's sanitized)
            inputtype: "textquery",
            point: req.body.location,
            circle: req.body.radius //radius entry, 0 to 50,000 m
            // minprice: 0,
            // maxprice: req.body.maxPrice, // maxPrice should be 0 to 4
            // language: "en"
        },
        timeout: 1000
    })
    .then(r => {
        console.log(r.data);
      })
      .catch(e => {
        console.log(e);
    });
});

module.exports = router;