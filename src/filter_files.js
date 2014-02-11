var conf = require( '../settings' ),
  helpers = require( './helpers' );

var VIDEO_EXT = conf.validVideoExt.map(function( ext ) { return ext.toLowerCase(); }),
 minSize = helpers.strToBytes( conf.minFileSize );


function isMinSize( file ) {
  return file.size > minSize;
}

function isVideoExt( file ) {
  var ext = file.filename.match( /\.([a-zA-Z0-9]{2,4})$/ );

  if( ext && ext.length === 2 ) {
    return VIDEO_EXT.indexOf( ext[1].toLowerCase() ) !== -1;
  }

  return false;
}


module.exports = function( files ) {

  var vidFiles = files
                    .filter( isMinSize )
                    .filter( isVideoExt );

  if( vidFiles.length === 0 ) {
    throw 'No files are big enough or have a video extension';
  }

  return vidFiles;
};