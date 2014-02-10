var _ = require( 'lodash' ),
  Promise = require( 'promise' ),
  fs = require( 'fs' ),
  mkdir = Promise.denodeify( fs.mkDir ),
  stat = Promise.denodeify( fs.stat );

module.exports = function( files ) {
  var shows = _.filter( files, 'isShow' );

  return Promise.all( shows.map(function( show ) {
    return stat( show.newDir() )
      .then( null, function() {
        return mkdir( show.newDir() );
      });
  }) ).then(function() { return files; });
};