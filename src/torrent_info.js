var log = require( '../lib/log' );

module.exports = function() {
  var torrent = {
    appVersion  : process.env.TR_APP_VERSION,
    time        : process.env.TR_TIME_LOCALTIME,
    dir         : process.env.TR_TORRENT_DIR,
    hash        : process.env.TR_TORRENT_HASH,
    id          : process.env.TR_TORRENT_ID,
    name        : process.env.TR_TORRENT_NAME
  };


  if( torrent.dir ) {
    log.info({ content : torrent }, 'Set torrent info from env' );
  } else {
    log.error({ env : process.env }, 'Couldn\'t find Transmission env vars' );
  }

  torrent.location = require( 'path' ).resolve( torrent.dir, torrent.name );

  return torrent;
};
