---
layout: post.html
title: Grunt.js takes your workflow to the next level
tags: [grunt, javascript, nodejs]
---
[Grunt.js][0] is a powerful task-based command line tool written in JavaScript on top of Node.js, and there are a number of grunt plugins that make it easy to set up common tasks, most common ones are concatenating files, linting, testing and minification.

![Grunt logo](/assets/posts/grunt-logo.png)

## Installation

### Ubuntu
```sh
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
$ sudo npm install -g grunt-cli
$ sudo npm install grunt --save-dev
```

### Mac OSX

```sh
$ brew install node
$ curl http://npmjs.org/install.sh | sh
$ npm install -g grunt-cli
$ npm install grunt --save-dev
```
## Integration

To integrate [Grunt.js][0] in your project, you just need to add two files, package.json and Gruntfile.js, to the root of your project.

### package.json
[package.json][1] file should contain project configurations (project name, version, license, author, etc...), it is always located in project root :

```json
{
  "name" : "example",
  "version" : "0.0.1",
  "author": "Adnane Belmadiaf",
  "homepage": "http://daker.me",
  "devDependencies": {
    "grunt": "~0.4.0",
    "grunt-contrib-concat": "~0.1.3",
    "grunt-contrib-uglify": "~0.1.1",
    "grunt-contrib-cssmin": "~0.4.1",
    "grunt-contrib-jshint": "~0.1.0",
    "grunt-contrib-compress": "~0.3.3"
  }
}
```

This will install Grunt and the plugins you will be using in your project, now all you need to do is running ```npm install``` command in the root folder of the project.

### Gruntfile.js
Gruntfile.js is used to define and configure tasks, and load [Grunt.js][0] [plugins][3].

```js
/*global module:false*/
module.exports = function(grunt){
    grunt.registerTask('hello', function(){
        console.log("Hello from the Gruntfile!");
    });
};
```
This is the Gruntfile.js i use to jshint/concat/cssmin and uglify all my CSS and JS files in one .min.(js|css) file. Sure you can go deeper, you can compile your Less or Sass files, watch files and run tasks whenever they changed and more.

```js
/*global module:false*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
        '/*!\n' +
        ' * app.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
        ' * GNU LGPL v3\n' +
        ' */'
    },
    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          head: false,
          module: false,
          console: false
        }
      },
      files: [ 'Gruntfile.js', 'js/app.js' ]
    },
    concat: {
      options:{
        separator: ';'
      },
      js: {
        src: ['src/js/*.js'],
        dest: 'build/app.js'
      },
      css:{
        src: ['src/css/*.css'],
        dest: 'build/app.css'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      build: {
        src: '<%= concat.js.dest %>',
        dest: 'build/app.min.js'
      }
    },

    cssmin: {
      options: {
            banner: '/*!\n' +
        ' * app.min.css <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
        ' * GNU LGPL v3\n' +
        ' */'
      },
      compress: {
        files: {
          'build/app.min.css': [ '<%= concat.css.dest %>' ]
        }
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );

  // Default task.
  grunt.registerTask( 'default', [ 'jshint', 'concat', 'cssmin', 'uglify' ] );
};
```

Now all you need to do is to run ```grunt``` from the commandline to run the default task or run ```grunt task-alias``` to run a specific task.

###Conclusion

[Grunt.js][0] is definetely the way to go, so make sure to take some time to try it and you'll be supprised how it’s easy get started to work with.

[0]: http://gruntjs.com
[1]: http://nodejs.org
[2]: https://npmjs.org/doc/json.html
[3]: http://gruntjs.com/plugins