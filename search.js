let axios = require("axios");
const searchSpotify = searchString => {
  return axios.get(
    "http://api.tvmaze.com/singlesearch/shows?q=" + searchString
  );
};

const searchBands = searchString => {
  return axios.get("http://api.tvmaze.com/search/people?q=" + searchString);
};

const searchOMDB = searchString => {
  return axios.get("http://api.tvmaze.com/search/people?q=" + searchString);
};

module.exports = {
  searchSpotify: searchSpotify,
  searchBands: searchBands,
  searchOMDB: searchOMDB
};
