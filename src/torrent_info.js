module.exports = function() {
  var torrent = {
    appVersion  : process.env.TR_APP_VERSION,
    time        : process.env.TR_TIME_LOCALTIME,
    dir         : process.env.TR_TORRENT_DIR,
    hash        : process.env.TR_TORRENT_HASH,
    id          : process.env.TR_TORRENT_ID,
    name        : process.env.TR_TORRENT_NAME
  };

  torrent.location = require( 'path' ).resolve( torrent.dir, torrent.name );

  return torrent;
};
