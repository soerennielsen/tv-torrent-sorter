var show = require( './show' ),
  movie = require( './movie' );

module.exports = function( files ) {
  return files.map(function( file ) {
    var matched = show.fromFile( file );
    if( matched ) {
      return matched;
    } else {
      return movie( file );
    }
  });
};