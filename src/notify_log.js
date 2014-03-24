var mustache = require( 'mustache' ),
  path = require( 'path' ),
  readFile = require( 'promise' ).denodeify( require( 'fs' ).readFile ),
  appendFile = require( 'promise' ).denodeify( require( 'fs' ).appendFile );


function render( name, data ) {
  return readFile(  path.resolve( __dirname, '../tmpl/', name + '.mustache' ) )
    .then( function( buffer ) {
      return mustache.render( buffer.toString(), data );
    });
}

function withTime( msg ) {
  return '\n' + (new Date()) + '\n---------\n' + msg + '\n---------\n';
}


module.exports = {
  success : function( data ) {
    render( 'success', data )
      .then( function( msg ) {
        appendFile( './success_log', withTime( msg ) );
      } );
  },
  err : function( err, data ) {
    //data.dump = JSON.stringify( data, null, 4 );
    data.error = err;

    render( 'error', data )
      .then( function(msg) {
        appendFile( './error_log', withTime( msg ) );
      } );
  }
};