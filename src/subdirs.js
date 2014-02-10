var fs = require( 'fs' ),
  path = require( 'path' ),
  Promise = require( 'promise' ),
  readdir = Promise.denodeify( fs.readdir ),
  stat = Promise.denodeify( fs.stat );

module.exports = function( dir ) {
  var localData = {};

  return readdir( dir )
    .then(function( files ) {
      localData.files = files;
      return Promise.all( files.map(function( file ) {
        return stat( path.resolve( dir, file ) );
      }) );
    })
    .then(function( stats ) {
      return localData.files.filter(function( file, i ) {
        return stats[ i ].isDirectory();
      });
    });

};