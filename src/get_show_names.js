var Promise = require( 'promise' ),
    _ = require( 'lodash' );

module.exports = function( showDirs, showRSSFeed ) {
  var showRSS = showRSSFeed ? require( './show_rss' )( showRSSFeed ) : [],
    showDirs = showDirs.map(function( d ) { return require( './subdirs' )( d ) });

  return Promise.all( showDirs.concat( showRSS ) )
    .then(function( dirs ) {
      return _.uniq( _.flatten( dirs ) );
    });
};