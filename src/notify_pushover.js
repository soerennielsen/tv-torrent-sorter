var mustache = require( 'mustache' ),
  path = require( 'path' ),
  conf = require( './config' ),
  readFile = require( 'promise' ).denodeify( require( 'fs' ).readFile ),
  Pushover = require( 'pushover-notifications' ),
  push = new Pushover({
    token : conf.pushover.appKey
  });


function render( name, data ) {
  return readFile(  path.resolve( __dirname, '../tmpl/', name + '.mustache' ) )
    .then( function( buffer ) {
      return mustache.render( buffer.toString(), data );
    });
}

function sendToAll( msgConf ) {
  conf.pushover.userKeys.map(function( key ) {
    push.send( _.extend({
      user : key
    }, msgConf ) );
  });
}



module.exports = {
  success : function( data ) {
    var subject = 'Torrent Sorter: ' + data.torrent.name + ' finished downloading';

    render( 'success', data )
      .then( function( msg ) {
        sendToAll({
          message : msg,
          title : subject
        });
      } );
  },
  err : function( err, data ) {
    var torrentName = data && data.torrent && data.torrent.name,
      subject = 'Torrent Sorter: An error occurred' + ( torrentName ? ' with ' + torrentName : '' );

    data.dump = JSON.stringify( data, null, 4 );
    data.error = err;

    render( 'error', data )
      .then( function(msg) {
          sendToAll({
            message : msg,
            title : subject
          });
      } );
  }
};
