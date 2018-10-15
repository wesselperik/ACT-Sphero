/**
 * ACT-Sphero: Log types
 * 
 * This file contains the different log types for the server class.
 * 
 * @author Wessel Perik
 * @author Thymo van Beers
 * @license MIT
 */

module.exports = Object.freeze({
    INFO:   Symbol("info"),
    WARNING:  Symbol("warning"),
    SUCCESS: Symbol("success"),
    ERROR: Symbol("error")
});