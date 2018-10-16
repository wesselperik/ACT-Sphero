/**
 * ACT-Sphero: Client
 * 
 * This is the client class for the ACT-Sphero project.
 * This class serves the web-interface for the client.
 * 
 * @author Wessel Perik
 * @author Thymo van Beers
 * @license MIT
 */

// Load external libraries
var express = require('express');

// Load local libraries
const Utils = require("../common/utils");
const LogType = require("../common/logtypes");

// Variables
var app = express();
var utils = new Utils();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

utils.log(LogType.INFO, "Starting ACT-Sphero client...");

app.listen(3000, function () {
  utils.log(LogType.SUCCESS, "ACT-Sphero client started. Running on port 3000.");
});