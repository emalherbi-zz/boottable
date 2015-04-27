module.exports = function(grunt) {
  'use strict';

	// Load the plugin that clean files and directories.
	grunt.loadNpmTasks('grunt-contrib-clean');
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
          "<%= properties.dist %>/<%= pkg.name %>.js"  : ['<%= pkg.name %>.js' ],
          "<%= properties.dist %>/<%= pkg.name %>.css" : ['<%= pkg.name %>.css']
        },
      },
    },

    /* js validate */
    jshint: {
      all: ['<%= pkg.name %>.js']
    },

    /* css validate */
    csslint: {
      all: ['<%= pkg.name %>.css']
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
  grunt.registerTask('deploy', [
    'clean',
    'concat',
    'jshint',
    'csslint',
    'uglify',
    'cssmin',
    'copy',
    'gh-pages'//,
    //'bump'
  ]);

  grunt.registerTask('default', [
    'deploy'
  ]);
};
