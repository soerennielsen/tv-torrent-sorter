var show = require( './show' ),
  movie = require( './movie' ),
  log = require( '../lib/log' );

module.exports = function( files ) {
  return files.map(function( file ) {
    var matched = show.fromFile( file );
    if( matched ) {
      log.info({ content : matched }, 'Matched file to show' );
      return matched;
    } else {
      log.info({ content : matched }, 'Unable to match file to show' );
      return movie( file );
    }
  });
};