console.log("this is loaded");

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_Secret
};

exports.bandsintown = {
  Key: process.env.BANDSINTOWN_Key
};

exports.omdb = {
  Key: process.env.OMDB_Key
};
