/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      dist: {
        src: [
          'js/App.js', 
          'js/app/Router.js', 
          'js/app/models/*.js', 
          'js/app/collections/*.js', 
          'js/app/views/Base.js', 
          'js/app/views/*.js'
        ],
        dest: 'js/SF.js'
      }
    },
    
    less: {
      dev: {
        src: 'css/screen.less',
        dest: 'css/screen.css'
      }
    },

    watch: {
      files: ['js/**/*.js', 'css/screen.less'],
      tasks: 'concat'
    }
  });

  // Custom tasks
  grunt.registerTask('default', 'less:dev concat');

};