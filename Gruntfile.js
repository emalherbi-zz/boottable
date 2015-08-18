module.exports = function(grunt) {
  'use strict';

	// Load the plugin that clean files and directories.
	grunt.loadNpmTasks('grunt-contrib-clean');
  // Turn ES6 code into vanilla ES5 with no runtime required using 6to5
  require("load-grunt-tasks")(grunt);
  // Load the plugin that concatenate files.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Load the plugin that validate files with JSHint.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Load the plugin that validate files with CSSLint.
  grunt.loadNpmTasks('grunt-contrib-csslint');
  // Load the plugin that copy files and directories.
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Load the plugin that minify and concatenate ".js" files.
	grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that minify and concatenate ".css" files.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Publish to GitHub Pages with Grunt
  grunt.loadNpmTasks('grunt-gh-pages');
  // Bump package version, create tag, commit, push ...
  grunt.loadNpmTasks('grunt-bump');
	// Automatic notifications when tasks fail.
	grunt.loadNpmTasks('grunt-notify');

  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
    properties: grunt.file.readJSON('properties.json'),

    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2010-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',

    /* clean directories */
    clean: ['<%= properties.dist %>'],

    /* concat files */
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      basic_and_extras: {
        files: {
          "<%= properties.temp %>/<%= pkg.name %>.es6.js"  :
            [
              // default
              '<%= properties.js %>/_default.js',

              // generic
              '<%= properties.js %>/_cursor.js',
              '<%= properties.js %>/_clr.js',
              '<%= properties.js %>/_msg.js',

              '<%= properties.js %>/_getColumns.js',

            ],
          "<%= properties.dist %>/<%= pkg.name %>.css" : ['<%= pkg.name %>.css']
        },
      },
    },

    /* Turn ES6 code into vanilla ES5 with no runtime required using 6to5 */
    '6to5': {
       options: {
           sourceMap: false
       },
       dist: {
           files: {
               '<%= properties.temp %>/<%= pkg.name %>.es5.js' : '<%= properties.temp %>/<%= pkg.name %>.es6.js'
           }
       }
    },

    /* js validate */
    jshint: {
      all: ['<%= properties.dist %>/<%= pkg.name %>.js']
    },

    /* css validate */
    csslint: {
      all: ['<%= properties.dist %>/<%= pkg.name %>.css']
    },

    /* js file minification */
    uglify: {
      options: {
        preserveComments: false
      },
      build: {
        files: {
          '<%= properties.dist %>/<%= pkg.name %>.min.js': ['<%= properties.dist %>/<%= pkg.name %>.js']
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          '<%= properties.dist %>/<%= pkg.name %>.min.css': ['<%= properties.dist %>/<%= pkg.name %>.css']
        }
      }
    },

    /* put files not handled in other tasks here */
    copy: {
      '6to5': {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= properties.temp %>',
          src: '<%= pkg.name %>.es5.js',
          dest: '<%= properties.dist %>/',
          rename: function(dest, src) {
            return dest + src.replace(".es5", "");
          }
        }]
      },
      test: {
        files: [{
          expand: true,
          dot: true,
          src: ['<%= pkg.name %>.js'],
          dest: 'example/js/'
        },{
          expand: true,
          dot: true,
          src: ['<%= pkg.name %>.css'],
          dest: 'example/css/'
        }]
      }
    },

    /* commit on gh-pages github */
    'gh-pages': {
      options: {
        base: 'example/',
        message: 'auto-generated commit'
      },
      src: ['**/*']
    },

    /* update bower json */
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitFiles: ['-a'], // all Files
        push: true,
        pushTo: 'origin'
      }
    }

	});

  // tasks
  grunt.registerTask('build', [
    'clean',
    'concat',
    '6to5',
    'copy:6to5',
    'jshint'//,
    //'csslint'//,
    //'uglify',
    //'cssmin',
    //'copy:test'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'gh-pages'//,
    //'bump'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
