var _ = require( 'lodash' ),
  Promise = require( 'promise' ),
  fs = require( 'fs' ),
  mkdirp = Promise.denodeify( require( 'mkdirp' ) ),
  stat = Promise.denodeify( fs.stat ),
  log = require( '../lib/log' );

module.exports = function( files ) {
  var dirs = _.uniq( _.invoke( _.filter( files, 'isShow' ), 'newDir' ) );

  return Promise.all( dirs.map(function( dir ) {
    return stat( dir )
      .then( null, function() {
        log.info( { dir : dir }, 'Creating new directory' );
        return mkdirp( dir );
      });
  }) ).then(function() { return files; });
};