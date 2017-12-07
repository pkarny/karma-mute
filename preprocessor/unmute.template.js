
// -------------------------------------------------------------------
(function (console) {
    'use strict';

    var mutedMethods = window.__mutedConsoleMethods;

    if (mutedMethods) {
        Object.keys(mutedMethods).forEach(function (method) {
           console[method] = mutedMethods[method];
        });

        window.__mutedConsoleMethods = null;
    }
}(window.console));
// --- All console methods unmuted -----------------------------------
