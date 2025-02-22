"use strict";

/**
 * Signal string to code conversion from the POSIX standard
 *
 *      1       HUP (hang up)
 *      2       INT (interrupt)
 *      3       QUIT (quit)
 *      6       ABRT (abort)
 *      9       KILL (non-catchable, non-ignorable kill)
 *      14      ALRM (alarm clock)
 *      15      TERM (software termination signal)
 */

const signalName2codeMap = {
    SIGHUP :  1,
    SIGINT :  2,
    SIGQUIT:  3,
    SIGABRT:  6,
    SIGKILL:  9,
    SIGALRM:  14,
    SIGTERM:  15
};

/**
 * Signal Exits codes
 *
 * (Refer to https://nodejs.org/api/process.html#exit-codes)
 *
 * @param {string} signalName - 'SIGINT', 'SIGQUIT', 'SIGTERM', ...
 * @returns {number} Signal Exits (>128): If Node.js receives a fatal signal such as SIGKILL or SIGHUP, then its
 * exit code will be 128 plus the value of the signal code. This is a standard POSIX practice, since exit codes are
 * defined to be 7-bit integers, and signal exits set the high-order bit, and then contain the value of the signal
 * code. For example, signal SIGABRT has value 6, so the expected exit code will be 128 + 6, or 134.
 */
function signalName2exitCodeMap (signalName) {
    return 128+signalName2codeMap[signalName];
}

/**
 * A counter
 */
function MyCounter () {
    this.counter = 0;
    this.incr = () => {this.counter += 1; return this.counter};
    this.decr = () => {this.counter -= 1; return this.counter};
    this.reset = () => {this.counter= 0};
}

/**
 * Returns a string which evaluation defines a variable and sets its value to the stringified JSON object. This
 * function produces the same result as what would be expected from `res.jsonp` (refer to
 * https://expressjs.com/en/5x/api.html#res.jsonp).
 *
 * @param {object} jsonObject - input object to stringify.
 * @param {string} objectName - JSON string name in the scope where the eventual script is run.
 * @return {string} - script to be eventually run on a remote machine.
 */
function jsonExportScript (jsonObject,objectName) {
    return `var ${objectName} = ${JSON.stringify(jsonObject)}`;
}


module.exports = {
    signalName2codeMap: signalName2codeMap,
    signalName2exitCodeMap: signalName2exitCodeMap,
    MyCounter: MyCounter,
    jsonExportScript: jsonExportScript
};
