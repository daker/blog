/*global module:false*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options:{
        separator: ';'
      },
      css:{
        src: ['_assets/css/*.css'],
        dest: '_assets/css/app.min.css'
      }
    },
    cssmin: {
      options: {
            banner: '/*!\n' +
        ' * app.min.css <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
        ' * https://daker.me/\n' +
        ' * CC BY-SA 3.0\n' +
        ' */'
      },
      compress: {
        files: {
          '_assets/css/app.min.css': [ '<%= concat.css.dest %>' ]
        }
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );

  // Default task.
  grunt.registerTask( 'default', [ 'concat', 'cssmin' ] );
};