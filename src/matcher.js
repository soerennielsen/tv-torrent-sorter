function normalize( str ) {
  return str
          .toLowerCase()
          .replace( /\s|_/g, '.' )
          .replace( /(:|\-|'|,)/g, '' );
}

function parseSeason( str ) {
  var nstr = normalize( str ),
    regs = [
    /s(\d{1,3})e\d{1,3}/,
    /(\d{1,3})x\d{1,3}/
  ];

  return regs.map( function( reg ) {
    var match = nstr.match( reg );
    if( match ) {
      return parseInt( match[ 1 ], 10 );
    }
  } ).filter(Boolean)[0];
}

module.exports = function( file, shows ) {
  var normalizedFilename = normalize( file.filename );

  var matched = shows.map( normalize ).map(function( normalizedShow, i ) {
    if( normalizedFilename.indexOf( normalizedShow ) === -1 ) {
      return false;
    } else {
      file.season = parseSeason( file.filename );
      file.show =  shows[ i ];
      return true;
    }
  }).filter( Boolean );

  if( matched.length > 1 ) {
    delete file.show;
    delete file.season;
    file.err = 'Matched multiple shows';
  } else if( matched.length === 0 ) {
    file.err = 'Couldn\'t match to an exisiting show';
  }

  return file;
};