var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Capture and store node arguments
var nodeArgs = process.argv;
var whichAPI = nodeArgs[2];
var searchParam = nodeArgs[3];

// TWITTER =================================================================================================
if (whichAPI === "my-tweets") {
    console.log(`receiving twitter input`);
}



// SPOTIFY =================================================================================================
if (whichAPI === "spotify-this-song") {
    console.log(`receiving spotify input ${searchParam}`);
}


// OMDB =================================================================================================
if (whichAPI === "movie-this") {
    console.log(`receiving OMDB input ${searchParam}`);
}


// RANDOM.TXT =================================================================================================
if (whichAPI === "do-what-it-says") {
    console.log(`receiving do-what input`);
}