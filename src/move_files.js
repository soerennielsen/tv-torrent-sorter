var Promise = require( 'promise' ),
  rename = Promise.denodeify( require( 'fs' ).rename );


module.exports = function( files ) {
  Promise.all( files.map(function( file ) {
    return rename( file.oldLocation(), file.newLocation() ).then( null, function( err ) {
      file.err = file.err || {};
      file.err.error = err;
      file.err.msg = 'Could not move file to new directory';
    });
  }) ).then( function() { return files; } );
};