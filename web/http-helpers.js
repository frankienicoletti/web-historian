var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var http = require('http');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, sendRes) {
  if (asset === '/') {
    asset = '/index.html';
  }
  var publicDir = path.join(archive.paths.siteAssets, asset);
  var archiveDir = path.join(archive.paths.archivedSites, asset);
  //asset in in /public
  fs.readFile(publicDir, 'utf8', function(err, data){
    if (err) {//not found in public, look in archive
      fs.readFile(archiveDir, 'utf8', function(err, data){
        if (err) {//not found in archive, 404 or loading

          archive.isUrlInList(asset, function(exists) {
            if (exists) {
              publicDir = path.join(archive.paths.siteAssets, '/loading.html');
              fs.readFile(publicDir, 'utf8', function(err, data) {
                sendRes(null, data, res, 302);
              });
            } else { //404
              sendRes(err, null, res, 404);
            }
          });

        } else { //in archive
          sendRes(null, data, res);
          archive.paths.urlsList[asset] = true;
        }
      });
    } else {//in public
      sendRes(null, data, res);
    }
  });
};

exports.sendResponse = function(error, html, res, code) {
  code = code || 200;
  if (error) {
    res.writeHead(code, headers);
    res.end();
  } else {
    res.writeHead(code, headers);
    res.end(html);
  }
};


exports.actions = {
  'GET': function(req, res) {
    var query = url.parse(req.url).path;
    exports.serveAssets(res, query, exports.sendResponse);
  },
  'POST': function(req, res) {
    var site = req._postData.url;
    archive.isUrlInList(site, function(exists){
      if(!exists){
        archive.paths.urlsList[site] = false;
        fs.appendFile(archive.paths.list, site+"\n", 'utf8', function(err){
          if (err) throw err;
          console.log('done!');
        });
      }
      exports.serveAssets(res, site, exports.sendResponse);
    })
  }
};

// for cron
var downloadURL = function(url, callback) {
  var fullURL = 'http:/'+url;
  http.get(fullURL, function(res) {
    res.on('data', function(data) {
      console.log(data.toString());
    });
    res.on('error', function(err) {
      console.log(err);
    });
    res.on('end', function() {
      console.log('end');
    });
  });
};