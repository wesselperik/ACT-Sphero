/**
 * ACT-Sphero: Server
 * 
 * This is the server class for the ACT-Sphero project.
 * This class first makes a connection with the Sphero.
 * When successfully connected, it waits for a client to connect
 * to the WebSocket. When a client is connected and sends a (valid) message,
 * Sphero will roll in the given direction.
 * 
 * @author Wessel Perik
 * @license MIT
 */

 var sphero = require("orbie");
var ws = require("ws");
var chalk = require("chalk");

var hasOSparameter = false;
var orb = undefined;
var socketServer = ws.Server;
var socket = new socketServer({port: 40510})

process.argv.forEach(function (val, index, array) {
    if (index == 2 && val == "--os") {
        hasOSparameter = true;
    }

    if (index == 3 && val == "mac") {
        orb = sphero("/dev/tty.Sphero-OPR-AMP-SPP");
    } else if (index == 3 && val == "linux") {
        orb = sphero("/dev/rfcomm0");
    } else if (index == 3 && val == "windows") {
        orb = sphero(""); // TODO: define Windows port
    }
});

if (!hasOSparameter) {
    console.log("ERROR: No OS parameter specified!");
    process.exit();
}

if (orb == undefined) {
    console.log("ERROR: No valid OS specified!");
    process.exit();
}

orb.connect(listen);
  
function listen() {
    console.log(chalk.bgCyan.black.bold(" INFO ") + " ACT-Sphero server started.");

    // Bind stop and roll functions
    var stop = orb.roll.bind(orb, 0, 0), roll = orb.roll.bind(orb, 60);

    // Wait for a client to connect to the WebSocket
    socket.on('connection', function (ws) {
        console.log(chalk.bgGreen.black.bold(" SUCCESS ") + " Web client connected!");

        // Send a packet each second to keep the WebSocket open
        setInterval(() => ws.send(""), 1000);
        
        // Change the orb's color to green
        orb.color("green");

        // Detect freefall and landing events
        orb.detectFreefall();

        orb.on("freefall", function(data) {
            // Send freefall event message
            console.log(chalk.bgCyan.black.bold(" INFO ") + " Freefall detected.");
            ws.send(JSON.stringify({"event": "freefall"}));
        });

        orb.on("landed", function(data) {
            // Send landing event message
            console.log(chalk.bgCyan.black.bold(" INFO ") + " Landing detected.");
            ws.send(JSON.stringify({"event": "landing"}));
        });

        // Handle messages received from the client
        ws.on('message', function (message) {
          console.log(chalk.bgYellow.black.bold(" MESSAGE ") + " %s", message);

          var key = JSON.parse(message).key;
          if (key == "w") {
            roll(0);
          }
    
          if (key == "s") {
            roll(180);
          }
    
          if (key == "a") {
            roll(270);
          }
    
          if (key ==="d") {
            roll(90);
          }

          // Send confirmation back to the client
          ws.send(JSON.stringify({"key": key}));
        });
    });
}