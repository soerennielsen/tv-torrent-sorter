var bunyan = require( 'bunyan' ),
  path = require( 'path' ),
  _ = require( 'lodash' ),
  mkdirp = require( 'mkdirp').sync,
  logPath = path.resolve( __dirname , '../logs' );

mkdirp( logPath );

var log = bunyan.createLogger({
  name: 'tv-torrent-sorter',
  streams : [{
    level: 'info',
    path : path.resolve( logPath, './run.log' )
  }]
}).child({
  runID : (new Date()).getTime()
});

_.bindAll( log );

module.exports = {
  info : log.info,
  error : log.error,
  fatal : log.fatal,
  promise : function( type, msg ) {
    return function( val ) {
      log[ type ]({ content : val }, msg );
      return val;
    };
  }
};