var _ = require( 'lodash' ),
  conf = require( './config' );

function movie( file ) {

  _.extend( file, {
    isMovie : true,
    newDir : function() {
      return conf.moviesDir;
    }
  });

  return file;
}

module.exports = movie;