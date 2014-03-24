var _ = require( 'lodash' ),
  promise = require( 'promise' ),
  request = promise.denodeify( require( 'request' ).get ),
  parseXML = promise.denodeify( require('xml2js').parseString );


function parse( response ) {
  return parseXML( response.body );
}

function getShowNames( xml ) {
  var names = _.pluck( xml.rss.channel[0].item, 'showrss:showname' );

  return _.uniq( _.flatten( names ) );
}


module.exports = function( url ) {
  return request( url )
          .then( parse )
          .then( getShowNames );
};