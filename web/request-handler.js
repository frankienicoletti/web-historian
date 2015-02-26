var path = require('path');
var archive = require('../helpers/archive-helpers');
var handler = require('./http-helpers.js');

exports.handleRequest = function (req, res) {
  handler.actions[req.method](req, res);
};
