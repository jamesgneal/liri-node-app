// API keys and connections
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = require("request");

// Capture node arguments
var nodeArgs = process.argv;
var whichAPI = nodeArgs[2];
var searchParam = nodeArgs[3];

// TWITTER =================================================================================================
if (whichAPI === "my-tweets") {
    console.log(`receiving twitter input`);

    // Twitter user to look up
    var screenName = "liri_reads_sux"
    // Number of tweets to return
    var numTweets = 20;

    // Connect to twitter
    client.get('statuses/user_timeline', {
        screen_name: screenName,
        count: numTweets
    }, function (error, tweets, response) {
        if (error) throw error;

        // Display latest tweets from user's screenname including timestamp
        console.log(`\n========================================\n   Latest tweets from @${screenName}\n========================================\n`);
        for (var i = 0; i < 20 && tweets[i]; i++) {
            console.log(`On ${tweets[i].created_at}:\n   "${tweets[i].text}"\n`);
        }
    });
}



// SPOTIFY =================================================================================================
if (whichAPI === "spotify-this-song") {
    console.log(`receiving spotify input ${searchParam}`);

    if (!searchParam) {
        // If user doesn't provide a song
        var userSong = "The Sign";

        // Connect to spotify
        spotify
            .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
            .then(function (data) {
                console.log(`\n * * * Track info for "${data.name}" * * * \n`);
                console.log(`Artist: ${data.artists[0].name}\nSong Title: ${data.name}\nListen on Spotify: ${data.external_urls.spotify}\nAlbum: ${data.album.name}\n`);

            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });

    } else {
        // User's song to look up
        var userSong = searchParam;

        // Connect to spotify
        spotify
            .search({
                type: 'track',
                query: userSong
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } else {
                    var songInfo = data.tracks.items[0];
                    console.log(`\n * * * Track info for "${songInfo.name}" * * * \n`);
                    console.log(`Artist: ${songInfo.artists[0].name}\nSong Title: ${songInfo.name}\nListen on Spotify: ${songInfo.external_urls.spotify}\nAlbum: ${songInfo.album.name}\n`);
                }
            });
    }
}


// OMDB =================================================================================================
if (whichAPI === "movie-this") {
    console.log(`receiving OMDB input ${searchParam}`);

    if (!searchParam) {
        // If no title is given to search
        var queryURL = `https://www.omdbapi.com/?t="mr+nobody"&y=&plot=short&apikey=trilogy`;

        // Connect to OMDB
        request(queryURL, function (error, response, body) {
            var movieObject = JSON.parse(body);
            console.log(`\n ~~~~~~ Movie info for "${movieObject.Title}" ~~~~~~ \n`);
            console.log(`Title: ${movieObject.Title}\nYear Released: ${movieObject.Year}\nIMDB Rating: ${movieObject.Ratings[0].Value}\nRotten Tomatoes Rating: ${movieObject.Ratings[1].Value}\nCountry Produced: ${movieObject.Country}\nLanguage: ${movieObject.Language}\nPlot: ${movieObject.Plot}\nActors: ${movieObject.Actors}\n`);
        });

    } else {
        // User's title to look up
        var title = searchParam;
        var queryURL = `https://www.omdbapi.com/?t="${title}"&y=&plot=short&apikey=trilogy`;

        // Connect to OMDB
        request(queryURL, function (error, response, body) {
            var movieObject = JSON.parse(body);
            console.log(`\n ~~~~~~ Movie info for "${movieObject.Title}" ~~~~~~ \n`);
            console.log(`Title: ${movieObject.Title}\nYear Released: ${movieObject.Year}\nIMDB Rating: ${movieObject.Ratings[0].Value}\nRotten Tomatoes Rating: ${movieObject.Ratings[1].Value}\nCountry Produced: ${movieObject.Country}\nLanguage: ${movieObject.Language}\nPlot: ${movieObject.Plot}\nActors: ${movieObject.Actors}\n`);
        });
    }
}


// RANDOM.TXT =================================================================================================
if (whichAPI === "do-what-it-says") {
    console.log(`receiving do-what input`);
}