module.exports = function( state ) {
  try {
    var torrentData = state.torrent.location;
    require( 'rimraf' )( torrentData, function() {} );
  } catch( e ) {}

  return state;
};