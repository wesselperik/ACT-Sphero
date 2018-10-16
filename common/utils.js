/**
 * ACT-Sphero: Server utilities
 * 
 * This class serves some utility-functions for the main server class
 * of the ACT-Sphero project.
 * 
 * @author Wessel Perik
 * @author Thymo van Beers
 * @license MIT
 */

var chalk = require("chalk");
var LogType = require("./logtypes");

module.exports = class Utils {
    constructor() {
        // empty constructor
    }

    log(type, message) {
        switch(type) {
            case LogType.INFO:
                console.log(chalk.bgCyan.black.bold(" INFO ") + " " + message);
                break;
            case LogType.WARNING:
                console.log(chalk.bgYellow.black.bold(" WARNING ") + " " + message);
                break;
            case LogType.SUCCESS:
                console.log(chalk.bgGreen.black.bold(" SUCCESS ") + " " + message);
                break;
            case LogType.ERROR:
                console.log(chalk.bgRed.black.bold(" ERROR ") + " " + message);
                break;
            default:
                console.log(chalk.bgCyan.black.bold(" INFO ") + " " + message);
        }
    }
}