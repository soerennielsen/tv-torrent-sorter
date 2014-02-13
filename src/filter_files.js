var conf = require( '../settings' ),
  helpers = require( './helpers' );

var VIDEO_EXT = conf.validVideoExt.map(function( ext ) { return ext.toLowerCase(); }),
 minSize = helpers.strToBytes( conf.minFileSize );


function isMinSize( file ) {
  return file.size > minSize;
}

function isVideoExt( file ) {
  return VIDEO_EXT.indexOf( file.ext() ) !== -1;
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