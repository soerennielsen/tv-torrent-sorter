module.exports = {
  strToBytes : function( str ) {
    var unit = str.slice( -2 ).toUpperCase(),
      i = parseInt( str.slice( 0, -2 ) ),
      pow = {
        TB : 4,
        GB : 3,
        MB : 2,
        KB : 1
      };

    return Math.pow( 1024, pow[ unit ] ) * i;
  },
  normalize : function( str ) {
    return str
          .toLowerCase()
          .replace( /\s|_/g, '.' )
          .replace( /(:|\-|'|,|\(|\))/g, '' );
  }
};