(function (console) {
    'use strict';

    var noopObject = {},
        noop = function () {};

    if (console && !window.__karma_mute_console) {
        // Iterate over methods and build object with same methods changed to noop
        Object.keys(console).forEach(function (method) {
            if (typeof console[method] === 'function') {
                noopObject[method] = noop;
            }
        });

        window.__karma_mute_console = noopObject;
    }

}(window.console));
// -------------------------------------------------------------------

