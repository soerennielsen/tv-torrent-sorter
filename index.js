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

  var state = {};

  require( './src/subdirs' )( conf.tvShowsDir )
    .then( save( show, 'shows' ) )
    .then( require( './src/torrent_info' ) )
    .then( save( state, 'torrent' ) )
    .then( require( './src/finder' ) )
    .then( require( './src/sort_files') )
    .then( require( './src/matcher') )
    .then( save( state, 'files') )
    .then( require( './src/make_dirs' ) )
    .then( require( './src/move_files' ) )
    .then( function() {
      return state;
    } )
    .done( notify.success, function( err ) {
      notify.err( err, state );
    });
} catch( e ) {
  notify.err( e, state );
}