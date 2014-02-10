var _ = require( 'lodash' ),
  path = require( 'path' ),
  normalize = require( './helpers' ).normalize,
  conf = require( '../settings' );


var episodeRegex = [
  //2014.03.15
  /\d{4}.\d{1,2}.\d{1,2}/,

  //5x13
  /(\d{1,3})x(\d{1,3})/i,

  //S01E01
  /s(\d{1,3})e(\d{1,3})/i
];

function matchEpisode( show ) {
  var name = normalize( show.filename );

  episodeRegex.forEach(function( r ) {
    var match = name.match( r );
    if( match ) {
      switch( match.length ) {
        case 3:
          show.episode = parseInt( match[2], 10 );
        case 2:
          show.season = parseInt( match[1], 10 );
          break;
        case 1:
          show.episode = match[0];
      }
    }
  });
}

function show( file, showName ) {
  matchEpisode( file );

  _.extend( file, {
    isShow : true,
    show : showName,
    newDir : function() {
      var season = file.season ? '/Season ' + file.season + '/' : '';
      return path.resolve( conf.tvShowsDir, file.show, season );
    }
  });

  return file;
}


show.fromFile = function( file ) {
  var filename = normalize( file.filename ),
    matched = show.shows.filter(function( showName ) {
      return filename.indexOf( normalize( showName ) ) !== -1;
    });

  file.matchedShows = matched;

  if( matched ) {
    return( show( file, matched[ 0 ] ) );
  } else {
    return false;
  }
};

show.shows = [];

module.exports = show;