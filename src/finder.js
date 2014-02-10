var findit = require( 'findit' ),
  path = require( 'path' ),
  Promise = require( 'promise' ),
  file = require( './file' );

module.exports = function( dir ) {
  if( dir.location ) { dir = dir.location; }

  var files = [],
    finder = findit( dir );

  finder.on( 'file', function( fileloc, stat ) {
    files.push( file({
      filename : path.basename( fileloc ),
      currentDir : path.dirname( fileloc ),
      location : fileloc,
      size : stat.size
    }) );
  });

  return new Promise(function( resolve, reject ) {
    finder.on( 'end', function() {
      if( files.length ) {
        resolve( files.sort(function( a, b ) {
          return b.size - a.size;
        }) );
      } else {
        reject( 'No torrent files found' );
      }
    });
  });
};