var _ = require( 'lodash' ),
  Promise = require( 'promise' ),
  fs = require( 'fs' ),
  mkdir = Promise.denodeify( fs.mkDir ),
  stat = Promise.denodeify( fs.stat );

module.exports = function( files ) {
  var dirs = _.uniq( _.invoke( _.filter( files, 'isShow' ), 'newDir' ) );

  return Promise.all( dirs.map(function( dir ) {
    return stat( dir )
      .then( null, function() {
        return mkdir( dir );
      });
  }) ).then(function() { return files; });
};