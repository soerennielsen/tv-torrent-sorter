module.exports = function( state ) {
  try {
    var torrentData = state.torrent.location;
    require( 'rimraf' )( torrentData );
  } catch( e ) {}

  return state;
};