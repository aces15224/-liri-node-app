require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

// var spotify = new Spotify({
//   id: f7f42937ecc5405b830800729f43f11b,
//   secret: c66d94bc9e794bdcab66002f52ddef5d
// });

switch (search){
  case "concert-this":
  concertThis()
  break;

  // case "spotify-this-song":
  // getSpotify();
  // break;

  case "movie-this":
  movieThis();
  break;

  // case "do-what-it-says":
  // doIt();
  // break;
    
}

 
// Spotify.search({ type: 'track', query: 'All the Small Things' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });



// if(search==="movie-this"){
//     url="http://www.omdbapi.com/?apikey=trilogy&t="+ term +""
//     console.log(term)
// }

// if(search==="do-what-it-says"){
//   fs.readFile("random.txt", "utf8", function(error, data) {

//     // If the code experiences any errors it will log the error to the console.
//     if (error) {
//       return console.log(error);
//     }
  
//     // We will then print the contents of data
//     console.log(data);
  
//     // Then split it by commas (to make it more readable)
//     var dataArr = data.split(",");
  
//     // We will then re-display the content as an array for later use.
    
  
//   });
// }
function concertThis(){
url="https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"

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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    
  });
}

function movieThis(){
  url="http://www.omdbapi.com/?apikey=trilogy&t="+ term +""

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
        console.log(movieObj)
    
     
    })
    .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    
  });
}

