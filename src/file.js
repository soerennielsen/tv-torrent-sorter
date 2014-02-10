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
    }
  });

  return conf;
}

module.exports = File;