module.exports = function( files ) {
  return files.sort(function( a, b ) {
    if( !a.isShow && !b.isShow ) {
      return 0;
    }

    if( !a.isShow ) {
      return 1;
    }

    if( !b.isShow ) {
      return -1;
    }

    if( a.show !== b.show ) {
      return a.show < b.show ? -1 : 1;
    }

    if( !a.season && !b.season ) {
      return 0;
    }

    if( !a.season ) {
      return 1;
    }

    if( !b.season ) {
      return -1;
    }

    if( a.season === b.season ) {

      if( !a.episode && !b.episode ) {
        return 0;
      }

      if( !a.episode ) {
        return 1;
      }

      if( !b.episode ) {
        return -1;
      }

      return a.episode - b.episode;
    }

    return a.season - b.season;

  });
};