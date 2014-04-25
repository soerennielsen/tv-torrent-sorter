var _ = require( 'lodash' ),
  conf = require( './config' );

function movie( file ) {

  _.extend( file, {
    isMovie : true,
    newDir : function() {
      // Don't know how to handle multiple movie dirs
      return conf.movieDirs[ 0 ];
    },
    stylizedName : function() {
      return 'Movie: ' + file.filename;
    }
  });

  return file;
}

module.exports = movie;