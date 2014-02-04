#!/usr/bin/env node

var fs = require( 'fs' ),
  _ = require( 'lodash' ),
  async = require( 'async' ),
  conf = require( './settings.json' ),
  helpers = require( './src/helpers' ),
  torrent = {
    appVersion : process.env.TR_APP_VERSION,
    time : process.env.TR_TIME_LOCALTIME,
    dir : process.env.TR_TORRENT_DIR,
    hash : process.env.TR_TORRENT_HASH,
    id : process.env.TR_TORRENT_ID,
    name : process.env.TR_TORRENT_NAME
  };

torrent.location = require( 'path' ).join( torrent.dir, torrent.name );

async.waterfall([
  function getShows( cb ) {
    var data = { torrent : torrent };
    require( './src/subdirs' )( conf.tvShowsDir, function( err, shows ) {
      data.shows = shows;
      cb( err, data );
    });
  },

  function getTorrentFiles( data, cb ) {
    require( './src/finder' )( torrent.location, function( err, files ) {
      data.files = files;
      cb( err, data );
    } );
  },

  function findLargeFiles( data, cb ) {
    var minSize = helpers.strToBytes( conf.minFileSize );

    if( !data.files ) {
      return cb( 'No files found.', data );
    }

    data.largeFiles = data.files.filter(function( file ) {
      return file.size > minSize;
    });

    if( !data.largeFiles.length ) {
      return cb( 'Largest file too small.', data );
    }

    cb( null, data );
  },

  function matchFiles( data, cb ) {
    var match = require( './src/matcher' );

    data.matchedFiles = data.largeFiles.map(function( file ) {
      return match( file, data.shows );
    });

    cb( null, data );
  },

  function makeDirs( data, cb ) {
    async.mapSeries( data.matchedFiles, function( file, cb ) {
      fs.stat( file.newDir(), function( err ) {
        if( err ) {
          fs.mkdir( file.newDir(), function( err ) {
            if( err ) { file.err = 'Couldn\'t make new directory. ' + err; }
            else { file.madeDir = true; }
            cb();
          });
        } else {
          file.madeDir = true;
          cb();
        }
      });
    }, function() {
      cb( null, data );
    });
  },

  function moveFiles( data, cb ) {
    var filesToMove = _.filter( data.matchedFiles, 'madeDir' );
    async.map( filesToMove, function( file, cb ) {
      fs.rename( file.oldLocation(), file.newLocation(), function( err ) {
        if( err ) { file.err = 'Could not move file. ' + err; }
        else { file.moved = true; }
        cb();
      });
    }, function() {
      cb( null, data );
    });
  }

], function allDone( err, data ) {
  var mailer = require( './src/mail' );

  if( err ) {
    mailer.err( err, data );
  } else {
    mailer.summary( data );
  }
});