# karma-mute
Karma preprocessor to mute noisy libs and scripts

Replaces all `console` methods calls with noop functions.

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
