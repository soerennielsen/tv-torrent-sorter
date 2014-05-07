var Promise = require( 'promise' ),
  rename = Promise.denodeify( require( 'fs' ).rename ),
  log = require( '../lib/log' );


module.exports = function( files ) {
  return Promise.all( files.map(function( file ) {
    log.info({ file : file }, 'Moving file' );
    return rename( file.oldLocation(), file.newLocation() ).then( null, function( err ) {
      log.error({ file : file, error : err }, 'Unable to move file' );
      file.err = file.err || {};
      file.err.error = err;
      file.err.msg = 'Could not move file to new directory';
    });
  }) ).then( function() { return files; } );
};