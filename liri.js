require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var typed = process.argv;
var moment = require('moment');
const fs = require('fs');
moment().format();


function liriBot() {
    if (typed[2] === "concert-this") {
        var searchFor = "The Flaming Lips";
        for (var i = 3; i < typed.length; i++) {
            if (i > 3 && i < typed.length) {
               searchFor = searchFor + "+" + typed[i];
            }
            else {
               searchFor = typed[i];
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
        var searchFor = "the Sign";
        for (var i = 3; i < typed.length; i++) {
            if (i > 3 && i < typed.length) {
                 searchFor = searchFor + "+" + typed[i];
            }
            else {
                searchFor = typed[i];
            }
        }
        spotify.search({ type: 'track', query: searchFor, limit: 20 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(data.tracks.items[7]);
            console.log("-------------------");
            console.log(data.tracks.items[7].album.artists[0].name);
            console.log(data.tracks.items[7].name);
            console.log(data.tracks.items[7].preview_url);
            console.log(data.tracks.items[7].album.name);
            console.log("-------------------");
            console.log(data.tracks.items[0].album.artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(data.tracks.items[0].album.name);
            console.log("-------------------");
            console.log(data.tracks.items[1].album.artists[0].name);
            console.log(data.tracks.items[1].name);
            console.log(data.tracks.items[1].preview_url);
            console.log(data.tracks.items[1].album.name);
            console.log("-------------------");

        });

    }
    else if (typed[2] === "movie-this") {
        var searchFor = "Mr. Nobody";
        for (var i = 3; i < typed.length; i++) {
            if (i > 3 && i < typed.length) {
                searchFor = searchFor + "+" + typed[i];
            }
            else {
                searchFor = typed[i];
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
    else if (typed[2]=== "do-what-it-says") {
        fs.readFile('./random.txt', (err, data) => {
            if (err) throw err;
            console.log(data.toString());
            if (data.toString().includes("spotify")) {
                var split = data.toString().split(",");
                console.log(split);
                var searchFor = split[1];
                spotify.search({ type: 'track', query: searchFor, limit: 20 }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    // console.log(data.tracks.items[7]);
                    console.log("-------------------");
                    console.log(data.tracks.items[7].album.artists[0].name);
                    console.log(data.tracks.items[7].name);
                    console.log(data.tracks.items[7].preview_url);
                    console.log(data.tracks.items[7].album.name);
                    console.log("-------------------");
                    console.log(data.tracks.items[0].album.artists[0].name);
                    console.log(data.tracks.items[0].name);
                    console.log(data.tracks.items[0].preview_url);
                    console.log(data.tracks.items[0].album.name);
                    console.log("-------------------");
                    console.log(data.tracks.items[1].album.artists[0].name);
                    console.log(data.tracks.items[1].name);
                    console.log(data.tracks.items[1].preview_url);
                    console.log(data.tracks.items[1].album.name);
                    console.log("-------------------");

                })}
            else if (data.toString().includes("concert")) {
                var split = data.toString().split(',');
                console.log(split);
                var searchFor = split[1];
                searchFor = searchFor.replace(/"/g,"");
                searchFor = searchFor.replace(/ /g,"");
                var queryUrl = "https://rest.bandsintown.com/artists/" + searchFor + "/events?app_id=codingbootcamp";
                console.log(queryUrl);
                request(queryUrl, function (error, response, body) {
                    // If the request is successful
                    if (!error && response.statusCode === 200) {
                        console.log("Next three concerts:");
                        console.log("Venue Name: " + JSON.parse(body)[0].venue.name);
                        console.log("Venue Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region + " " + JSON.parse(body)[0].venue.country);
                        console.log(JSON.parse(body)[0].datetime);
                        console.log("-----------------------------------");
                        console.log("Venue Name: " + JSON.parse(body)[1].venue.name);
                        console.log("Venue Location: " + JSON.parse(body)[1].venue.city + ", " + JSON.parse(body)[1].venue.region + " " + JSON.parse(body)[1].venue.country);
                        console.log(JSON.parse(body)[1].datetime);
                        console.log("-----------------------------------");
                        console.log("Venue Name: " + JSON.parse(body)[2].venue.name);
                        console.log("Venue Location: " + JSON.parse(body)[2].venue.city + ", " + JSON.parse(body)[2].venue.region + " " + JSON.parse(body)[2].venue.country);
                        console.log(JSON.parse(body)[2].datetime);
                    }
                });
            }
            else if (data.toString().includes("movie")) {
                var split = data.toString().split(',');
                console.log(split);
                var searchFor = split[1];
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

        }});

    }
}

liriBot();