console.log("keys are loaded");

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_Secret
};

exports.bandsintown = {
  id: process.env.BANDSINTOWN_Key
};

exports.omdb = {
  id: process.env.OMDB_Key
};
