var Promise = require( 'promise' ),
    _ = require( 'lodash' );

module.exports = function( showsDir, showRSSFeed ) {
  var showRSS = showRSSFeed ? require( './show_rss' )( showRSSFeed ) : [],
    showDirs = require( './subdirs' )( showsDir );

  return Promise.all([ showDirs, showRSS ])
    .then(function( dirs ) {
      return _.uniq( _.flatten( dirs ) );
    });
};