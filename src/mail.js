var mustache = require( 'mustache' ),
  conf = require( '../settings.json' ),
  mailer = require( 'nodemailer' ).createTransport('SMTP', {
    service : conf.mail.service,
    auth : conf.mail.auth
  }),
  tmpl = {
    success : require( 'fs' ).readFileSync( __dirname + '/../tmpl/success.mustache' ).toString()
  };



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
    sendEmail( data.torrent.name + ' finished downloading', mustache.render( tmpl.success, data ) );
  },
  err : function( err, data ) {
    sendEmail( 'An error occurred with ' + data.torrent.name, JSON.stringify( err ) + '\n\n' + JSON.stringify( data ) );
  }
};
