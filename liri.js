require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

// Capture and store node arguments
var nodeArgs = process.argv;
var whichAPI = nodeArgs[2];
var searchParam = nodeArgs[3];

// TWITTER =================================================================================================
if (whichAPI === "my-tweets") {
}



// SPOTIFY =================================================================================================
if (whichAPI === "spotify-this-song") {

}


// OMDB =================================================================================================
if (whichAPI === "movie-this") {

}


// RANDOM.TXT =================================================================================================
if (whichAPI === "do-what-it-says") {
    
}