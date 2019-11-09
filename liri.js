require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

function getSpotify(){
  if(!term){
      term="The sign";
    }
  spotify.search({ type: 'track', query: term, limit:5})
  .then(function(response) {
     var songs = response.tracks.items;
  if(term==="The sign"){
    console.log(term);
      console.log("artist(s): " + songs[4].artists[0].name);
      console.log("song name: " + songs[4].name);
      console.log("preview song: " + songs[4].preview_url);
      console.log("album: " + songs[4].album.name);
      console.log("-----------------------------------");
  }
  else{
    for (var i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("artist(s): " + songs[i].artists[0].name);
      console.log("song name: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("-----------------------------------");
  }}})
  .catch(function(err) {
    console.log(err);
  });  
}

switch (search){
  case "concert-this":
  concertThis()
  break;

  case "spotify-this-song":
  getSpotify();
  break;

  case "movie-this":
  movieThis();
  break;

  case "do-what-it-says":
  doIt();
  break;
}

function doIt(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    dataSplit=dataArr.slice(1).join(" ");
  
  spotify.search({ type: 'track', query: dataSplit, limit:1 })
  .then(function(response) {
    var songs = response.tracks.items;

     for (var i = 0; i < songs.length; i++) {
      console.log("artist(s): " + songs[i].artists[0].name);
      console.log("song name: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("-----------------------------------");
  } 
  })
  .catch(function(err) {
    console.log(err);
  });
  });
}

function concertThis(){
url="https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

axios
  .get(url)
  .then(function(response) {
      var concert=response.data;
      concertObj=[
      "Venue:" + concert[0].venue.name,
      "Date:" + concert[0].datetime,        
      "Location:" + concert[0].venue.city + "," + concert[0].venue.region
      ]
      console.log(concertObj)
    })
  .catch(function(error) {
    if (error.response) {
      
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
});
}

function movieThis(){
  if(!term){
    term="mr nobody";
  }
  url="http://www.omdbapi.com/?apikey=trilogy&t="+ term +"";
  
  axios
  .get(url)
  .then(function(response) {
        var movie=response.data;
        movieObj=[
        "Title:" + movie.Title,
        "Release Date:" + movie.Released,
        "IMDB Rating:" + movie.imdbRating,
        "Rotten Tomatoes Rating:" + movie.Ratings[2].Value,
        "Produced in:" + movie.Country,
        "Language:" + movie.Language,
        "Plot:" + movie.Plot,
        "Actors:" + movie.Actors
        ]
        console.log(movieObj);
    })
    .catch(function(error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
    });
}

