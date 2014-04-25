var _ = require( 'lodash' ),
  path = require( 'path' ),
  normalize = require( './helpers' ).normalize,
  conf = require( './config' );


var episodeRegex = conf.episodeRegexes;

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

function baseDir( file ) {
  var existingBaseDir = conf._tsShowNames[ file.show ];
  return existingBaseDir ? existingBaseDir : conf.showDirs[ 0 ];
}

function show( file, showName ) {
  matchEpisode( file );

  _.extend( file, {
    isShow : true,
    show : showName,
    newDir : function() {
      var season = file.season ? 'Season ' + file.season : '';
      return path.resolve( baseDir( file ), file.show, season );
    },
    normalFileName : function() {
      return file.show + '.S' + file.season + 'E' + file.episode + '.' + file.ext();
    },
    stylizedName : function() {
      if( !file.season && file.season !== 0 ) {
        return file.show + ' ' + file.episode;
      } else {
        return file.show + ' S' + file.season + 'E' + file.episode;
      }
    }
  });

  if( conf.renameFiles && file.season && file.episode ) {
    file.newLocation = function() {
      return path.resolve( file.newDir(), file.normalFileName() );
    };
  }

  return file;
}


show.fromFile = function( file ) {
  var filename = normalize( file.filename ),
    matched = show.shows.filter(function( showName ) {
      return filename.indexOf( normalize( showName ) ) !== -1;
    });

  file.matchedShows = matched;

  if( Array.isArray( matched ) && matched.length ) {
    return( show( file, matched[ 0 ] ) );
  } else {
    return false;
  }
};

show.shows = [];

module.exports = show;