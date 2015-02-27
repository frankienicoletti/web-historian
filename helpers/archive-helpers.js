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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(url, callback){
  fs.readFile(exports.path.list, 'utf8', function(err, data) {
    if (err) callback(err);
    callback(null, data);
  });
};

//GET
exports.isUrlInList = function(url, callback){
  // if (exports.path.urlsList[url])
  // return true
  // else
  // return false
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
