require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var typed = process.argv;
var moment = require('moment');
moment().format();


function liriBot() {
    if (typed[2] === "concert-this") {
        for (var i = 3; i < typed.length; i++) {
            if (i > 3 && i < typed.length) {
               var searchFor = searchFor + "+" + typed[i];
            }
            else {
               var searchFor = typed[i];
            }
        }
        var queryUrl = "https://rest.bandsintown.com/artists/" + searchFor + "/events?app_id=codingbootcamp";
        console.log(queryUrl);
        request(queryUrl, function (error, response, body) {
            // If the request is successful
            if (!error && response.statusCode === 200) {
                console.log("Next three concerts:");
                console.log("Venue Name: " + JSON.parse(body)[0].venue.name);
                console.log("Venue Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region + " " + JSON.parse(body)[0].venue.country);
                console.log(JSON.parse(body)[0].datetime);
                console.log("-----------------------------------")
                console.log("Venue Name: " + JSON.parse(body)[1].venue.name);
                console.log("Venue Location: " + JSON.parse(body)[1].venue.city + ", " + JSON.parse(body)[1].venue.region + " " + JSON.parse(body)[1].venue.country);
                console.log(JSON.parse(body)[1].datetime);
                console.log("-----------------------------------")
                console.log("Venue Name: " + JSON.parse(body)[2].venue.name);
                console.log("Venue Location: " + JSON.parse(body)[2].venue.city + ", " + JSON.parse(body)[2].venue.region + " " + JSON.parse(body)[2].venue.country);
                console.log(JSON.parse(body)[2].datetime);
            }
        });
    }
    else if (typed[2] === "spotify-this-song") {
        for (var i = 3; i < typed.length; i++) {
            if (i > 3 && i < typed.length) {
                var searchFor = searchFor + "+" + typed[i];
            }
            else {
                var searchFor = typed[i];
            }
        }
        spotify
            .search({ type: 'track', query: searchFor })
            .then(function(response) {
                console.log(JSON.parse(response));
            })
            .catch(function(err) {
                console.log(err);
            });

    }
    else if (typed[2] === "movie-this") {
        for (var i = 3; i < typed.length; i++) {
            if (i > 3 && i < typed.length) {
                var searchFor = searchFor + "+" + typed[i];
            }
            else {
                var searchFor = typed[i];
            }
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + searchFor + "&y=&plot=short&apikey=trilogy";

        console.log(queryUrl);

        request(queryUrl, function(error, response, body) {

            // If the request is successful
            if (!error && response.statusCode === 200) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

                console.log("Movie Name: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Produced In: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log(JSON.parse(body).Plot);
                console.log("Starring: " + JSON.parse(body).Actors);


            }
        });
    }
}

liriBot();