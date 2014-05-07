var findit = require( 'findit' ),
  path = require( 'path' ),
  Promise = require( 'promise' ),
  file = require( './file' ),
  log = require( '../lib/log' );

module.exports = function( dir ) {
  if( dir.location ) { dir = dir.location; }

  var files = [],
    finder = findit( dir );

  finder.on( 'file', function( fileloc, stat ) {
    var fstat = {
      filename : path.basename( fileloc ),
      currentDir : path.dirname( fileloc ),
      location : fileloc,
      size : stat.size
    };
    log.info({ content : fstat }, 'Found torrent file' );
    files.push( file( fstat ) );
  });

  return new Promise(function( resolve, reject ) {
    finder.on( 'end', function() {
      if( files.length ) {
        resolve( files.sort(function( a, b ) {
          return b.size - a.size;
        }) );
      } else {
        log.error( 'No torrent files found' );
        reject( 'No torrent files found' );
      }
    });
  });
};