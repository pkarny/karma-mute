const fs = require('fs');
const esprima = require('esprima');
const MUTE_TEMPLATE = fs.readFileSync(__dirname + '/mute.template.js', 'utf8');

// Inspired by Esprima documentation
// http://esprima.readthedocs.io/en/4.0/syntactic-analysis.html#example-console-calls-removal

module.exports = function karmaMutePreprocessor () {
    "use strict";

    function isConsoleCall(node) {
        return (node.type === 'CallExpression') &&
            (node.callee.type === 'MemberExpression') &&
            (node.callee.object.type === 'Identifier') &&
            (node.callee.object.name === 'console');
    }

    function warnAboutConsoleDeclaration (node) {
        let noConsoleVariableRedeclared = true;
        if (node.type === 'VariableDeclaration') {
            let declarations = node.declarations,
                i = declarations.length - 1;

            while(i > -1 && noConsoleVariableRedeclared) {
                if (declarations[i].type === 'VariableDeclarator' && declarations[i].id.name === 'console') {
                    noConsoleVariableRedeclared = false;
                }

                i --;
            }

            return !noConsoleVariableRedeclared;
        }

        return false;
    }

    return function (content, file, done) {
        let entries = [],
            consoleVariableRedeclared = false;

        esprima.parseScript(content, {}, (node, meta) => {
            if (warnAboutConsoleDeclaration(node)) {
                console.error('[karma-mute] \'console\' variable was redeclared within the file: ' + file + '. Unexpected result may appear. Aborting preprocessing for this file...');
                consoleVariableRedeclared = true;
            } else if (isConsoleCall(node)) {
                entries.push({
                    start: meta.start.offset,
                    end: meta.end.offset
                });
            }
        });

        if (!consoleVariableRedeclared) {
            entries.sort((a, b) => {
                return b.end - a.end
            }).forEach(n => {
                content = content.slice(0, n.start) + content.slice(n.end);
            });

            content = content.replace(/window\.console|window\[(\s)?('|")console('|")(\s)?]/g, 'window.__karma_mute_console');

            done(MUTE_TEMPLATE + content);
        } else {
            done(content);
        }
    }
};