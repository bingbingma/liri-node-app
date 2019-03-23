let search = require("./search.js");

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
    case "track":
      search.searchSpotify(searchString);
      break;
    case "bands":
      search.searchBands(searchString);
      break;
    case "movies":
      search.searchOMDB(searchString);
      break;
    default:
      console.log(
        "That was not a valid command. Valid commands are 'track' and 'bands' and 'shows'"
      );
  }
};

liriSearch();
