// API keys and connections
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = require("request");
var fs = require("fs");

// Capture node arguments
var nodeArgs = process.argv;
var whichAPI = nodeArgs[2];
var searchParam = nodeArgs[3];

function logCommand() {
    // Log the command to log.txt
    fs.appendFile("log.txt", `\nNODE COMMAND GIVEN: ${whichAPI} ${searchParam}\n`, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

// TWITTER =================================================================================================
function loadTweets() {
    
    logCommand();

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
        fs.appendFile("log.txt", `\n========================================\n   Latest tweets from @${screenName}\n========================================\n`, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        for (var i = 0; i < 20 && tweets[i]; i++) {
            console.log(`On ${tweets[i].created_at}:\n   "${tweets[i].text}"\n`);
            fs.appendFile("log.txt", `On ${tweets[i].created_at}:\n   "${tweets[i].text}"\n`, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
}

// SPOTIFY =================================================================================================
function loadSpotifyTrack(song) {

    logCommand();

    if (!song) {
        // If user doesn't provide a song
        var userSong = "The Sign";

        // Connect to spotify
        spotify
            .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
            .then(function (data) {
                console.log(`\n * * * Track info for "${data.name}" * * * \nArtist: ${data.artists[0].name}\nSong Title: ${data.name}\nListen on Spotify: ${data.external_urls.spotify}\nAlbum: ${data.album.name}\n`);

                fs.appendFile("log.txt", `\n * * * Track info for "${data.name}" * * * \nArtist: ${data.artists[0].name}\nSong Title: ${data.name}\nListen on Spotify: ${data.external_urls.spotify}\nAlbum: ${data.album.name}\n`, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });


            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });

    } else {
        // User's song to look up
        var userSong = song;

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
                    console.log(`\n * * * Track info for "${songInfo.name}" * * * \nArtist: ${songInfo.artists[0].name}\nSong Title: ${songInfo.name}\nListen on Spotify: ${songInfo.external_urls.spotify}\nAlbum: ${songInfo.album.name}\n`);
                
                    fs.appendFile("log.txt", `\n * * * Track info for "${data.name}" * * * \nArtist: ${data.artists[0].name}\nSong Title: ${data.name}\nListen on Spotify: ${data.external_urls.spotify}\nAlbum: ${data.album.name}\n`, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                
                
                }
            });
    }
}

// OMDB =================================================================================================
function loadOMDB(movie) {

    logCommand();

    if (!movie) {
        // If no title is given to search
        var queryURL = `https://www.omdbapi.com/?t="mr+nobody"&y=&plot=short&apikey=trilogy`;

        // Connect to OMDB
        request(queryURL, function (error, response, body) {
            var movieObject = JSON.parse(body);
            console.log(`\n ~~~~~~ Movie info for "${movieObject.Title}" ~~~~~~ \nTitle: ${movieObject.Title}\nYear Released: ${movieObject.Year}\nIMDB Rating: ${movieObject.Ratings[0].Value}\nRotten Tomatoes Rating: ${movieObject.Ratings[1].Value}\nCountry Produced: ${movieObject.Country}\nLanguage: ${movieObject.Language}\nPlot: ${movieObject.Plot}\nActors: ${movieObject.Actors}\n`);
           
           
            fs.appendFile("log.txt", `\n ~~~~~~ Movie info for "${movieObject.Title}" ~~~~~~ \nTitle: ${movieObject.Title}\nYear Released: ${movieObject.Year}\nIMDB Rating: ${movieObject.Ratings[0].Value}\nRotten Tomatoes Rating: ${movieObject.Ratings[1].Value}\nCountry Produced: ${movieObject.Country}\nLanguage: ${movieObject.Language}\nPlot: ${movieObject.Plot}\nActors: ${movieObject.Actors}\n`, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        
        });

        

    } else {
        // User's title to look up
        var title = movie;
        var queryURL = `https://www.omdbapi.com/?t="${title}"&y=&plot=short&apikey=trilogy`;

        // Connect to OMDB
        request(queryURL, function (error, response, body) {
            var movieObject = JSON.parse(body);
            console.log(`\n ~~~~~~ Movie info for "${movieObject.Title}" ~~~~~~ \nTitle: ${movieObject.Title}\nYear Released: ${movieObject.Year}\nIMDB Rating: ${movieObject.Ratings[0].Value}\nRotten Tomatoes Rating: ${movieObject.Ratings[1].Value}\nCountry Produced: ${movieObject.Country}\nLanguage: ${movieObject.Language}\nPlot: ${movieObject.Plot}\nActors: ${movieObject.Actors}\n`);
        
            fs.appendFile("log.txt", `\n ~~~~~~ Movie info for "${movieObject.Title}" ~~~~~~ \nTitle: ${movieObject.Title}\nYear Released: ${movieObject.Year}\nIMDB Rating: ${movieObject.Ratings[0].Value}\nRotten Tomatoes Rating: ${movieObject.Ratings[1].Value}\nCountry Produced: ${movieObject.Country}\nLanguage: ${movieObject.Language}\nPlot: ${movieObject.Plot}\nActors: ${movieObject.Actors}\n`, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        
        
        
        });
    }
}







// Check the inputs and execute the appropriate functions
if (whichAPI === "my-tweets") {
    loadTweets();

} else if (whichAPI === "spotify-this-song") {
    loadSpotifyTrack(searchParam);

} else if (whichAPI === "movie-this") {
    loadOMDB(searchParam);

} else if (whichAPI === "do-what-it-says") {

    // Connect to random.txt
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        // Create a data array to store the instructions in the file
        var dataArr = data.split(",");

        // Find out the command listed in dataArr
        // Check the inputs and execute the appropriate functions
        if (dataArr[0] === "my-tweets") {
            loadTweets();

        } else if (dataArr[0] === "spotify-this-song") {
            loadSpotifyTrack(dataArr[1]);

        } else if (dataArr[0] === "movie-this") {
            loadOMDB(dataArr[1]);

        }
    });
}