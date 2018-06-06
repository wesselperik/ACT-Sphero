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
        orb = sphero("/dev/rfcomm0"); // TODO: define Linux port
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

console.log("Connecting to sphero...");
orb.connect(function() {
    console.log("Connected!");
    orb.color("green");
});
