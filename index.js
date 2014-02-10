#!/usr/bin/env node

var conf = require( './settings' ),
  show = require( './src/show' ),
  notify = require( './src/notify' );


function save( obj, key ) {
  return function( val ) {
    obj[ key ] = val;
    return val;
  };
}

var state = {};

require( './src/subdirs' )( conf.tvShowsDir )
  .then( save( show, 'shows' ) )
  .then( require( './src/torrent_info' ) )
  .then( save( state, 'torrent' ) )
  .then( require( './src/finder' ) )
  .then( require( './src/sort_files') )
  .then( require( './src/matcher') )
  .then( function( files ) {
    state.files = files;
    return state;
  } )
  .then( require( './src/make_dirs' ) )
  .then( require( './src/move_files' ) )
  .done( notify.success, function( err ) {
    notify.err( err, state );
  });
