module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'test/lib/**/*.js',
      'test/unit/**/*.js',
      'js/**/*.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/underscore/underscore.js',
      {pattern: 'img/asteroid.png', included: false, served: true},
    ],

    exclude : [
    ],

    preprocessors: {
        '*.html': ['html2js']
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-jasmine',
      'jasmine-jquery',
      'karma-html2js-preprocessor',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
   ]
})}
