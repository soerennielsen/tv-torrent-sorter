var fs = require( 'fs' ),
  async = require( 'async' );


module.exports = function( dir, cb ) {
  async.waterfall([
    fs.readdir.bind( null, dir ),
    function( files, cb ) {
      async.map( files.map(function( file ) {
        return dir + '/' + file;
      }), fs.stat, function(err, stats) {
        cb( err, stats, files );
      });
    },
    function( stats, files, cb ) {
      cb( null, files.filter( function( file, i ) {
        return stats[ i ].isDirectory();
      }) );
    }
  ], function( err, dirs ) {
    cb( err, dirs );
  });
};