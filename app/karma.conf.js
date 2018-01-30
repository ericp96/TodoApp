module.exports = function (config) {
    config.set({
        basePath: '../test',
        frameworks: ['mocha'],
        files: ["**/*.js"],
        browsers: ['Chrome', 'Firefox'],

        preprocessors: {
            'src/**/*.js': ['babel'],
            'test/**/*.js': ['babel']
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
            filename: function (file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function (file) {
                return file.originalPath;
            }
        },

        client: {
            mocha: {
                grep: "test/**/*.js",
                // change Karma's debug.html to the mocha web reporter 
                reporter: 'html',

                // require specific files after Mocha is initialized 
                require: [require.resolve('bdd-lazy-var')],

                // custom ui, defined in required file above 
                ui: 'bdd-lazy-var',
            }
        }
    });
};