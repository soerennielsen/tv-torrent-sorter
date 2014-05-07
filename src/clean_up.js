var log = require( '../lib/log' );

module.exports = function( state ) {
  try {
    var torrentData = state.torrent.location;
    log.info({ torrent : state.torrent }, 'Removing torrent location' );
    require( 'rimraf' )( torrentData, function() {} );
  } catch( e ) {
    log.error({ torrent : state.torrent, error: e }, 'Unable to remove torrent location' );
  }

  return state;
};