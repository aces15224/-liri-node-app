require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

if(search==="concert-this"){
    
    url="https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"
    
}

if(search==="movie-this"){
    url="http://www.omdbapi.com/?apikey=trilogy&t="+ term +""
}

axios
  .get(url)
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    if(search==="concert-this"){
        var concert=response.data;
        concertObj=[
        "Venue:" + concert[0].venue.name,
        "Date:" + concert[0].datetime,        
        "Location:" + concert[0].venue.city + "," + concert[0].venue.region
        ]
        console.log(concertObj)
            

        
    // console.log(response.data[0].datetime)
    // console.log(response.data[0].venue.name)
    }
    else if(search==="movie-this"){
        var movie=response.data;
        // console.log(response.data)
        movieObj=[
        "Title:" + movie.Title,
        "Release Date:" + movie.Released,
        "IMDB Rating:" + movie.imdbRating,
        // "Rotten Tomatoes Rating:" + movie[0],
        "Produced in:" + movie.Country,
        "Language:" + movie.Language,
        "Plot:" + movie.Plot,
        "Actors:" + movie.Actors
        ]
        console.log(movieObj)
    }

    // console.log(response.data);
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