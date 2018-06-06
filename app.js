var sphero = require("orbie");

var hasOSparameter = false;
var validOS = false;
var orb = undefined;

process.argv.forEach(function (val, index, array) {
    if (index == 2 && val == "--os") {
        hasOSparameter = true;
    }

    if (index == 3 && val == "mac") {
        orb = sphero("/dev/tty.Sphero-OPR-AMP-SPP");
    } else if (index == 3 && val == "linux") {
        orb = sphero("/dev/tty.Sphero-OPR-AMP-SPP"); // TODO: define Linux port
    } else if (index == 3 && val == "windows") {
        orb = sphero("/dev/tty.Sphero-OPR-AMP-SPP"); // TODO: define Windows port
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

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function(key){
    if (key == '\u001B\u005B\u0041') {
        console.log("ORB: rolling forward");
        orb.roll(50, 0);
    }
    if (key == '\u001B\u005B\u0043') {
        console.log("ORB: rolling right");
        orb.roll(50, 90);
    }
    if (key == '\u001B\u005B\u0042') {
        console.log("ORB: rolling backward");
        orb.roll(50, 180);
    }
    if (key == '\u001B\u005B\u0044') {
        console.log("ORB: rolling left");
        orb.roll(50, 270);
    }

    if (key == '\u0003') { process.exit(); }    // ctrl-c
});

console.log("Connecting to sphero...");
orb.connect(function() {
    console.log("Connected!");
    orb.color("green");
});