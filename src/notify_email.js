var mustache = require( 'mustache' ),
  path = require( 'path' ),
  conf = require( './config' ),
  readFile = require( 'promise' ).denodeify( require( 'fs' ).readFile ),
  mailer = require( 'nodemailer' ).createTransport('SMTP', {
    service : conf.mail.service,
    auth : conf.mail.auth
  });


function render( name, data ) {
  return readFile(  path.resolve( __dirname, '../tmpl/', name + '.mustache' ) )
    .then( function( buffer ) {
      return mustache.render( buffer.toString(), data );
    });
}


function sendEmail( subject, body ) {
  mailer.sendMail({
    from: conf.mail.from,
    to: conf.mail.to,
    subject: subject,
    text: body,
  }, function(){
    mailer.close();
  });
}



module.exports = {
  success : function( data ) {
    var subject = data.torrent.name + ' finished downloading';

    render( 'success', data )
      .then( sendEmail.bind( null, subject ) );
  },
  err : function( err, data ) {
    var torrentName = data && data.torrent && data.torrent.name,
      subject = 'An error occurred' + ( torrentName ? ' with ' + torrentName : '' );

    data.dump = JSON.stringify( data, null, 4 );
    data.error = err;

    render( 'error', data )
      .then( sendEmail.bind( null, subject ) );
  }
};
