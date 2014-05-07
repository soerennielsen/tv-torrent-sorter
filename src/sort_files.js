
function checkProp( a, b, prop ) {
  if( !a[ prop ] && !b[ prop ] ) {
    return 0;
  }

  if( !a[ prop ] ) {
    return 1;
  }

  if( !b[ prop ] ) {
    return -1;
  }

  if( a[ prop ] === b[ prop ] ) {
    return true;
  }

  return false;
}

function isNum( val ) {
  return typeof val === 'number';
}


module.exports = function( files ) {
  return files.sort(function( a, b ) {
    var areShows = checkProp( a, b, 'isShow' );

    if( isNum( areShows ) ) {
      return areShows;
    }

    var areSameShow = checkProp( a, b, 'show' );

    if( isNum( areSameShow ) ) {
      return areSameShow;
    }

    if( !areSameShow ) {
      return a.show < b.show ? -1 : 1;
    }

    var areSameSeason = checkProp( a, b, 'season' );

    if( isNum( areSameSeason) ) {
      return areSameSeason;
    }

    if( areSameSeason ) {

      var areSameEpisode = checkProp( a, b, 'episode' );

      if( isNum( areSameEpisode ) ) {
        return areSameEpisode;
      }

      return a.episode - b.episode;
    }

    return a.season - b.season;

  });
};