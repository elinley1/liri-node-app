var dotenv = require("dotenv").config();
var keys = require("./keys");


var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);



var client = new Twitter(keys.twitter);

var request = require("request");

var nodeArgs = process.argv;

if (process.argv[2] === "Movie-This") {
  movieThis();
}
else if (process.argv[2] === "Get-My-Tweets") {
  getMyTweets();
}
else if (process.argv[2] === "Spotify-This-Song") {
  spotifyThisSong();
}
else {
  console.log("Please enter a valid command.")
};

function movieThis() {

  var movieName = "";
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];
    };
  };
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Movie Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
    }
    else if (response.length === 0) {
      movieName = "Mr. Nobody";
      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("Movie Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
        }
      },

//movieThis();

function getMyTweets() {
  client.get('statuses/user_timeline', { screen_name: 'ErinATLin', count: 20 }, function (error, tweets, response) {
    if (error) {
      return console.log("Error occurred: " + error);
    }
    let Tweets = tweets.map(i => {
      return i.text;
    })
    console.log("My Tweets: " + Tweets);
  });
});
getMyTweets();

function spotifyThisSong() {

  var trackName = "";
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      trackName = trackName + " " + nodeArgs[i];
    }
    else {
      trackName += nodeArgs[i];
    };
  };


  spotify.search({ type: 'track', query: trackName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    let albums = data.tracks.items.map(i => {
      return i.album.name;
    })
    let artists = data.tracks.items.map(i => {
      return i.artists.name;
    })
    let preview = data.tracks.items.map(i => {
      return i.preview_url;
    })
    console.log("Track Name: " + JSON.stringify(trackName) + "\nAlbums: " + JSON.stringify(albums) + "\nArtists: " + JSON.stringify(artists) + "\nPreview of Song: " + JSON.stringify(preview), null, 4);
  });
};

function doWhatItSays() {
  var fs = require('fs');
  fs.readFile('random.txt', function (err, data) {
    if (err) throw err;
    var array = data.toString().split(",");
    array.forEach(function (i) {
      console.log(array[i]);
    })
  });
}}})}