const fs = require('fs');
const MUTE_TEMPLATE = fs.readFileSync(__dirname + '/mute.template.js', 'utf8');
const UNMUTE_TEMPLATE = fs.readFileSync(__dirname + '/unmute.template.js', 'utf8');

module.exports = function karmaMutePreprocessor () {

    return function (content, file, done) {
        done(MUTE_TEMPLATE + content + UNMUTE_TEMPLATE);
    }
};