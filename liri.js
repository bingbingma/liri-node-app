let search = require("./search.js");
// let axios = require("axios");
let moment = require("moment");

let searchString = "";

if (process.argv.length > 2) {
  for (let i = 3; i < process.argv.length; i++) {
    if (i === process.argv.length - 1) {
      searchString = searchString + process.argv[i];
    } else {
      searchString = searchString + process.argv[i] + "+";
    }
  }
}

console.log(searchString);

let userInput = process.argv[2];
const liriSearch = () => {
  switch (userInput) {
    case "spotify-this-song":
      console.log("Getting Results");
      search.searchSpotify(searchString).then(response => {
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
    case "concert-this":
      search.searchBands(searchString).then(response => {
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
    case "movie-this":
      search.searchOMDB(searchString).then(response => {
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
    case "do-what-it-says":
      search.randomSearch();
      break;
    default:
      console.log(
        "That was not a valid command. Valid commands are 'spotify-this-song' and 'concert-this' and 'movie-this'"
      );
  }
};

liriSearch();
