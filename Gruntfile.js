module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  const options = {
    config: {
      src: './grunt/*.js',
    },
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      serve: {
        script: 'app.js',
        options: {
          ignore: ['node_modules/**'],
        },
      },
    },
  };

  const configs = require('load-grunt-configs')(grunt, options);

  // Project configuration.
  grunt.initConfig(configs);

  grunt.registerTask('b-sync', [
    'browserSync',
  ]);
};
