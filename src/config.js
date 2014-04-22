var _ = require( 'lodash' );

var merged = _.merge( {}, require('../defaults'), require( '../settings' ) );

function optional( attr ) {
  merged[ attr ] = merged[ attr ] ? merged[ attr ] : false;
}

function arrayFlexible( attr ) {
  merged[ attr ] = [].concat( merged[ attr ] );
}

[ 'showRSS', 'renameFiles' ].map( optional );
[ 'showDirs', 'movieDirs' ].map( arrayFlexible );


module.exports = merged;
