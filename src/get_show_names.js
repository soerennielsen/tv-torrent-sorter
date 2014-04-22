var Promise = require( 'promise' ),
    _ = require( 'lodash' ),
    conf = require( './config' );


function addNamesToConf( dir, names ) {
  conf._tsShowNames = conf._tsShowNames || {};
  names.forEach(function( name ) {
    conf._tsShowNames[ name ] = dir;
  });

  return names;
}

module.exports = function( showDirs, showRSSFeed ) {
  var showRSS = showRSSFeed ? require( './show_rss' )( showRSSFeed ) : [],
    showDirs = showDirs.map(function( dir ) {
      return require( './subdirs' )( dir ).then( _.partial( addNamesToConf, dir ) );
    });

  return Promise.all( showDirs.concat( showRSS ) )
    .then(function( dirs ) {
      return _.uniq( _.flatten( dirs ) );
    });
};