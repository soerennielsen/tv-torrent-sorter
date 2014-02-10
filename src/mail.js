var mustache = require( 'mustache' ),
  conf = require( '../settings' ),
  mailer = require( 'nodemailer' ).createTransport('SMTP', {
    service : conf.mail.service,
    auth : conf.mail.auth
  });


function tmpl( name ) {
  return require( 'fs' ).readFileSync( __dirname + '/../tmpl/' + name + '.mustache' ).toString();
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
  summary : function( data ) {
    sendEmail( data.torrent.name + ' finished downloading', mustache.render( tmpl( 'success' ), data ) );
  },
  err : function( err, data ) {
    data.dump = JSON.stringify( data, null, 4 );
    data.error = err;

    sendEmail( 'An error occurred with ' + data.torrent.name, mustache.render( tmpl( 'error' ), data ) );
  }
};
