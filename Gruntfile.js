/*global module:false*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      options: {
        banner: '/*!\n' +
        ' * app.min.css <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
        ' * https://daker.me/\n' +
        ' * CC BY-SA 3.0\n' +
        ' */\n'
      },
      compile: {
        files: {
          '_assets/css/app.min.css': '_assets/css/styles.styl',
        }
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-stylus' );

  // Default task.
  grunt.registerTask( 'default', [ 'stylus' ] );
};