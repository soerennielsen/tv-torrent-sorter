var Promise = require( 'promise' ),
    _ = require( 'lodash' ),
    log = require( '../lib/log' ),
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
    showDirNames = showDirs.map(function( dir ) {
      return require( './subdirs' )( dir )
              .then( _.partial( addNamesToConf, dir ) )
              .then( log.promise( 'info', 'Got show names from show directories' ) );
    });

  return Promise.all( showDirNames.concat( showRSS ) )
    .then(function( dirs ) {
      return _.uniq( _.flatten( dirs ) );
    });
};