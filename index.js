#!/usr/bin/env node

var notify = require( './src/notify' );


function save( obj, key ) {
  return function( val ) {
    obj[ key ] = val;
    return val;
  };
}

try {
  var conf = require( './settings' ),
    show = require( './src/show' );

  var state = {
    env : JSON.stringify( process.env, null, 4 ),
    startTime : (new Date()).getTime()
  };

  require( './src/subdirs' )( conf.tvShowsDir )
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
    .then( function() {
      state.endTime = (new Date()).getTime();
      state.runTime = ( state.endTime - state.startTime ) / 1000;
      return state;
    } )
    .done( notify.summary, function( err ) {
      state.err = err;
      notify.err( err, state );
    });
} catch( e ) {
  notify.err( e, state );
}