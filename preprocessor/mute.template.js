// --- Mute all console methods --------------------------------------
(function (console) {
    'use strict';

    var mutedMethods = {},
        noop = function () {};

    if (console) {
        // Iterate over methods
        Object.keys(console).forEach(function (method) {
            if (typeof console[method] === 'function') {
                mutedMethods[method] = console[method];
                console[method] = noop;
            }
        });

        window.__mutedConsoleMethods = mutedMethods;
    }
}(window.console));
// -------------------------------------------------------------------

