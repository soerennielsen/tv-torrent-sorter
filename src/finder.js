var findit = require( 'findit' ),
  path = require( 'path' ),
  File = require( './file' );

module.exports = function( dir, cb ) {
  var files = [],
    finder = findit( dir );
  finder.on( 'file', function( file, stat ) {
    files.push( new File({
      filename : path.basename( file ),
      currentDir : path.dirname( file ),
      location : file,
      size : stat.size
    }) );
  });

  finder.on( 'end', function() {
    cb( null, files.sort(function( a, b ) {
      return b.size - a.size;
    }) );
  });

  return finder;
};