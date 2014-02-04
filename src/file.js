var _ = require( 'lodash' ),
  path = require( 'path' ),
  conf = require( '../settings.json' );

function File( conf ) {
  _.extend( this, conf );
}

_.extend( File.prototype, {
  oldDir : function() {
    return this.currentDir;
  },
  newDir : function() {
    var season = this.season ? '/Season ' + this.season + '/' : '';
    return path.join( conf.tvShowsDir, this.show, season );
  },
  oldLocation : function() {
    return this.location;
  },
  newLocation : function() {
    return path.join( this.newDir(), this.filename );
  }
});

module.exports = File;