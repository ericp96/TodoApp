module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['mocha'],
        files: ["*.js"],
        browsers: ['Chrome', 'Firefox'],

        files: [
            { pattern: 'test/**/*.test.js', watched: false }
        ],

        preprocessors: {
            'src/**/*.js': ['babel'],
            'test/**/*.test.js': ['babel']
        },

        babelPreprocessor: {
            // should use babelrc
            // options: {
            //     presets: ['es2015'],
            //     sourceMap: 'inline'
            // },
            // filename: function (file) {
            //     return file.originalPath;
            // },
            // sourceFileName: function (file) {
            //     return file.originalPath;
            // }
        },

        client: {
            mocha: {
                grep: "test\\/[a-zA-Z0-9]+\\/[a-zA-Z0-9].test.js",
                reporter: 'html',
                require: [require.resolve('bdd-lazy-var')],
                ui: 'bdd-lazy-var',
            }
        }
    });
};