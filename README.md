# karma-mute
Karma preprocessor to mute noisy libs and scripts.

Removes all `console` methods calls from preprocessed files.
Replaces any `window.console` occurrences with `noop`.

## Install
```bash
$ npm install karma-mute --save-dev
```

## Usage
Just add the preprocessor to `karma.conf.js` as `plugin` and then use the `preprocessors` section to select files that you want to mute.

```js
module.exports = function(config) {
    config.set({
        plugins: [
            'karma-mute'
        ],
        preprocessors: {
            '**/noisyFile.js': ['mute']
        },
        // ...
    });
};
```