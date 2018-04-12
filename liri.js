var dotenv = require("dotenv").config();
var keys = require("./keys");
var fs = require("fs");

var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);



var client = new Twitter(keys.twitter);

var request = require("request");

var nodeArgs = process.argv;

var cmd = process.argv[2];
console.log("Command", cmd);
var args = process.argv.slice(3);
console.log(args)


var cmdHandlers = {
  "movie-this": movieThis,
  "get-my-tweets": getMyTweets,
  "spotify-this-song": spotifyThisSong,
  "do-what-it-says": doWhatItSays
}

function run(cmd, args) {
  cmdHandlers[cmd](args)
}

run(cmd, process.argv.slice(3));

function doWhatItSays() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      return (err);
    }  
    var fileParts = data.toString().split(",");
    var fcmd = fileParts[0];
    var fargs = fileParts.slice(1);
    console.log("Running command w/ args", fcmd, fargs);
    run(fcmd, fargs);
    })
  }; 

function movieThis(args) {
  var movieName = args.join(" ").trim()
  movieName = movieName != "" ? movieName : "Mr. Nobody";
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function (error, response, body) {
    if(error) {
      console.error(error);
    }
    else if (!error && response.statusCode === 200) {
      console.log("Movie Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
    }
    else  {
      console.log("NON 200 Response", response);
    }
  })  
};


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
};


function spotifyThisSong(args) {
  var trackName = args.join(" ");
  trackName = trackName != "" ? trackName : "The Sign";
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


