let fs = require("fs");
require("dotenv").config();
let axios = require("axios");
let keys = require("./keys");
var Spotify = require("node-spotify-api");
let moment = require("moment");

var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

const searchSpotify = searchString => {
  return spotify.search({ type: "track", query: searchString, limit: 5 });
};

const searchBands = searchString => {
  console.log(
    "https://rest.bandsintown.com/artists/" +
      searchString +
      "/events?app_id=" +
      keys.bandsintown.id
  );
  return axios.get(
    "https://rest.bandsintown.com/artists/" +
      searchString +
      "/events?app_id=" +
      keys.bandsintown.id
  );
};

const searchOMDB = searchString => {
  console.log(
    "http://omdbapi.com/?t=" + searchString + "&apikey=" + keys.omdb.id
  );
  if (searchString.length > 0) {
    return axios.get(
      "http://omdbapi.com/?t=" + searchString + "&apikey=" + keys.omdb.id
    );
  } else {
    return axios.get(
      "http://omdbapi.com/?t=" + "Mr.+Nobody" + "&apikey=" + keys.omdb.id
    );
  }
};

function randomSearch() {
  fs.readFile("random.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let randomArray = data.split("\n");
    let randNum = Math.floor(Math.random() * Math.floor(randomArray.length));

    let pick = randomArray[randNum];
    let command = pick.substr(0, pick.indexOf(" ")).trim();
    let searchString = pick.substr(pick.indexOf(" ")).trim();
    switch (command) {
      case (command = "concert-this"):
        searchString = searchString
          .trim()
          .split(" ")
          .join("+");
        searchBands(searchString).then(response => {
          if (response.data[0]) {
            for (let i = 0; i < Math.min(response.data.length, 10); i++) {
              console.log("Result #" + (i + 1));
              console.log("Venue: " + response.data[i].venue.name);
              console.log("City: " + response.data[i].venue.city);
              console.log("State: " + response.data[i].venue.region);
              console.log("Country: " + response.data[i].venue.country);
              console.log(
                "Date: ",
                moment(response.data[i].datetime).format("MM/DD/YY")
              );
              console.log("----------------------");
            }
            console.log("\nWhat would you like me to look up next?");
          } else {
            console.log("\nNo results found for " + searchString);
            console.log("\nWhat do you want to look up next?");
          }
        });
        break;
      case (command = "spotify-this-song"):
        searchSpotify(searchString).then(response => {
          for (let i = 0; i < response.tracks.items.length; i++) {
            console.log(
              "Artist: ",
              response.tracks.items[i].album.artists[0].name
            );
            console.log("Song: ", response.tracks.items[i].name);
            console.log("Album: ", response.tracks.items[i].album.name);
            console.log(
              "Release Date: ",
              response.tracks.items[i].album.release_date
            );
            response.tracks.items[i].preview_url
              ? console.log("Preview: ", response.tracks.items[i].preview_url)
              : console.log("No Preview available.");
          }
          console.log("\nWhat do you want to look up next?");
        });
        break;
      case (command = "movie-this"):
        searchString = searchString
          .trim()
          .split(" ")
          .join("+");
        searchOMDB(searchString).then(response => {
          if (response.data.Title) {
            console.log("Title: " + response.data.Title);
            console.log("Release Date: " + response.data.Released);
            if (response.data.Ratings[0]) {
              console.log("IMDB Rating: " + response.data.Ratings[0].Value);
              console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
            } else {
              console.log("Ratings not available");
            }
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
          } else {
            console.log("No results.");
          }
          console.log("\nWhat do you want to look up next?");
        });
        break;
    }
  });
}

module.exports = {
  searchSpotify: searchSpotify,
  searchBands: searchBands,
  searchOMDB: searchOMDB,
  randomSearch: randomSearch
};

//.Ratings[1].Value * Rotten Tomatoes Rating of the movie."?
//console.log(response.data.Ratings[1].Source)
//console.log(JSON.stringify(response.data.Ratings[1])); // to see the object
