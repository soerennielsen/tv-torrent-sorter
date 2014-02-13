var _ = require( 'lodash' ),
  path = require( 'path' );

function File( conf ) {

  _.extend( conf, {
    oldDir : function() {
      return conf.currentDir;
    },
    oldLocation : function() {
      return conf.location;
    },
    newLocation : function() {
      return path.join( conf.newDir(), conf.filename );
    },
    ext : function() {
      var match = conf.filename.match( /\.([a-zA-Z0-9]{2,4})$/ );
      if( match && match.length === 2 ) {
        return match[ 1 ];
      } else {
        return false;
      }
    }
  });

  return conf;
}

module.exports = File;