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

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});