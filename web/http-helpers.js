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

//MODEL METHODS
var getFile = function(file, callback) {
  // html is contents of file
  var html = '';
  //file = web address
  // callback to be anonymous function with writeHead and end
  // file.on('error', function (err) {
  //   callback(err);
  // });

  // file.on('data', function (data) {
  //   // data is contents of site
  //   html+=data.toString();
  // });

  // file.on('end', function () {
  //   callback(null, html);
  // });
};

//asset is directory
exports.serveAssets = function(res, asset, callback) {
  var publicDir = path.join(archive.paths.siteAssets, asset);
  var archiveDir = path.join(archive.paths.archivedSites, asset);
  //asset in in /public
  fs.readFile(asset, 'utf8', function(err, data){
    if (err) {
      callback(err);
    } else {
      callback(err, data);
    }
  });
    //serve the file
  //else
    //asset in /archive
      //serve file
    //is asset in list
      //serve the loading page
    // else 404
};

// 'slash route' == homepage
// everything else is a request for someone else's page





exports.actions = {
  'GET': function(req, res) {
    var query = url.parse(req.url).path;
    if (query === '/') {
      exports.routes['/'](req, res);
    } else {
      exports.routes['*'](req, res);
    }
  },
  'POST': function(req, res) {

  }
};


exports.routes = {
  '/': function(req, res) {
    var query = url.parse(req.url).path;
    var directory = path.join(archive.paths['/'], 'index.html');
    exports.serveAssets(res, query, function(error, html){
      if (error) {
        res.writeHead(404, headers);
        res.end();
      } else {
        res.writeHead(200, headers);
        res.end(html);
      }
    });
  },
  '*': function(req, res) {
    var query = url.parse(req.url).path;
    exports.serveAssets(res, query, function(error, html){
      if (error) {
        res.writeHead(404, headers);
        res.end();
      } else {
        res.writeHead(200, headers);
        res.end(html);
      }
    });
  }
};

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
