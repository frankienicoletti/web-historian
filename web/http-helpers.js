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

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...)
  //  , css, or anything that doesn't change often.)
};

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
    var directory = path.join(archive.paths['/'], 'index.html');
    console.log(directory, "/");
    var file = fs.createReadStream(directory);
    getFile(file, function(error, html){
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
    var directory = path.join(archive.paths.archivedSites, query);
    var file = fs.createReadStream(directory);
    getFile(file, function(error, html){
      if (error) {
        downloadURL(query, function() {});
        res.writeHead(404, headers);
        res.end();
      } else {
        res.writeHead(200, headers);
        res.end(html);
      }
    });
  }
};


// 'slash route' == homepage
// everything else is a request for someone else's page



//MODEL METHODS
var getFile = function(file, callback) {
  // html is contents of file
  var html = '';
  //file = web address
  // callback to be anonymous function with writeHead and end
  file.on('error', function (err) {
    callback(err);
  });

  file.on('data', function (data) {
    // data is contents of site
    html+=data.toString();
  });

  file.on('end', function () {
    callback(null, html);
  });
};

var downloadURL = function(url, callback) {
  var fullURL = 'http:/'+url;
  http.get(fullURL, function(res) {
    res.on('data', function(data) {
      console.log(data.toString());
    });
  });


};


var addFile = function() {


};


// var file = fs.createWriteStream('./out.txt');

// process.stdin.on('data', function(data) {
//   file.write(data);
// });
// process.stdin.on('end', function() {
//   file.end();
// });
// process.stdin.resume(); // stdin in paused by default