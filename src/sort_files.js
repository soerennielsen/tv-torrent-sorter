var conf = require( '../settings' ),
  helpers = require( './helpers' );

module.exports = function( files ) {
  var minSize = helpers.strToBytes( conf.minFileSize );

  var largeFiles = files.filter(function( file ) {
    return file.size > minSize;
  });

  if( largeFiles.length === 0 ) {
    throw 'No files are big enough';
  }

  return largeFiles;
};