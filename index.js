#!/usr/bin/env node

var conf = require( './src/config' ),
    notify = require( './src/notify_' + conf.notifyType ),
    show = require( './src/show' ),
    log = require( './lib/log' );

function save( obj, key ) {
  return function( val ) {
    obj[ key ] = val;
    return val;
  };
}

try {
  var state = {
    startTime : (new Date()).getTime()
  };

  log.info( state, 'Run started' );

  require( './src/get_show_names' )( conf.showDirs, conf.showRSS )
    .then( save( show, 'shows' ) )
    .then( require( './src/torrent_info' ) )
    .then( save( state, 'torrent' ) )
    .then( require( './src/finder' ) )
    .then( require( './src/filter_files') )
    .then( require( './src/matcher') )
    .then( require( './src/sort_files') )
    .then( save( state, 'files') )
    .then( require( './src/make_dirs' ) )
    .then( require( './src/move_files' ) )
    .then(function() {
      state.endTime = (new Date()).getTime();
      state.runTime = ( state.endTime - state.startTime ) / 1000;
      return state;
    })
    .then( require( './src/clean_up' ) )
    .then( notify.success, function( err ) {
      log.error( err, 'Finished with error state' );
      notify.err( err, state );
    })
    .then(function() {
      log.info( state, 'End state' );
    });
} catch( e ) {
  log.error( e, 'Finished with error state' );
  log.info( state, 'End state' );
  notify.err( e, state );
}