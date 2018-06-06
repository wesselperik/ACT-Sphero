var sphero = require("orbie");
var keypress = require("keypress");

var hasOSparameter = false;
var isCalibrating = false;
var orb = undefined;

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

function handle(ch, key) {
    var stop = orb.roll.bind(orb, 0, 0),
        roll = orb.roll.bind(orb, 60);
  
    if (key.ctrl && key.name === "c") {
        process.stdin.pause();
        process.exit();
    }
  
    if (key.name === "e") {
        isCalibrating = true;
        orb.startCalibration();
    }
  
    if (key.name === "q") {
        if (isCalibrating) orb.finishCalibration();
        isCalibrating = false;
        orb.color("green");
    }
  
    if (key.name === "up") {
        roll(0);
    }
  
    if (key.name === "down") {
        roll(180);
    }
  
    if (key.name === "left") {
        roll(270);
    }
  
    if (key.name === "right") {
        roll(90);
    }
  
    if (key.name === "space") {
        stop();
    }
}
  
function listen() {
    orb.color("green");
    keypress(process.stdin);
    process.stdin.on("keypress", handle);
  
    console.log("starting to listen for arrow key presses");
  
    process.stdin.setRawMode(true);
    process.stdin.resume();
}
  
orb.connect(listen);
