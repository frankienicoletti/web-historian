var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  '/': path.join(__dirname, '../web/public'),
  'urlsList': {}
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.initializeArchive = function(callback) {
  exports.readListOfUrls(function(err, data) {
    if (err) throw err;
    var dataArray = data.split('\n');
    _.each(dataArray, function(url) {
      exports.paths.urlsList[url] = false;
    });
  });

};

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) callback(err);
    callback(null, data);
  });
};

//GET
exports.isUrlInList = function(url, callback){
  // if undefined -> 404
  if (exports.paths.urlsList[url] === undefined) {
    callback(false);
  } else {
    callback(true);
  }

};

//POST
exports.addUrlToList = function(url, callback){
  // if (exports.path.urlsList[url])
  // do nothing
  // else
  // exports.path.urlsList[url] = false;
};

exports.isURLArchived = function(url, callback){
  // if exports.path.urlsList[url]
  // return true
  // else return false
};

exports.downloadUrls = function(url, callback){
};
