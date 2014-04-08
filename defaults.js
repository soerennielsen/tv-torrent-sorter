module.exports = {
  renameFiles : false,

  // Size at which a file is assumed to be of worth
  minFileSize : '100MB',
  validVideoExt : [ 'mkv', '3gp', 'avi', 'mp4', 'mpg',
                    'mp3', 'flv', 'mov', 'asf', 'asx',
                    'wmv', 'swf', 'ogg', 'rm', 'divx',
                    'mpeg' ],

  episodeRegexes : [
    //2014.03.15
    /\d{4}[\.\-_]\d{1,2}[\.\-_]\d{1,2}/,

    // Season 03 Episode 01
    /Season.{0,1}(\d{1,2}).{0,1}Episode.{0,1}(\d{1,2})/i,

    //5x13
    /(\d{1,3})x(\d{1,3})/i,

    //S01E01
    /s(\d{1,3})e(\d{1,3})/i

  ],

  // pushover or email
  notifyType : 'log'
};