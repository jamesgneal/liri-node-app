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

    // connect to twitter API

    var screenName = "liri_reads_sux"
    var numTweets = 20;
    // var queryURL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${screenName}&count=${numTweets}`;
    
    client.get('statuses/user_timeline', { screen_name: screenName, count: numTweets }, function (error, tweets, response) {
        if (error) throw error;
        console.log(tweets[0].text); // The favorites.  
    });

    // var screenName = "liri_reads_sux"
    // var numTweets = 20;
    // var queryURL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${screenName}&count=${numTweets}`;

    // $.ajax({
    //     url: queryURL,
    //     method: 'GET'
    // }).then(function (response) {
    //     console.log(response);
    // });
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