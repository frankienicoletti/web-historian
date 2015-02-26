var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');

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
    var home = 'http://localhost:63342/2015-02-web-historian/web/public/index.html'
    // url user is expecting
    var query = url.parse(req.url).path;
    // creates path to stored file based on url
    var directory = path.join(archive.paths.archivedSites, query);
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
  'POST': function(req, res) {

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

var doStuff = function(err, data){

}