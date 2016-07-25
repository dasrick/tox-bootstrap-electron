module.exports = function (grunt) {
  'use strict';
  grunt.util.linefeed = '\n';
  // load all grunt tasks
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  // setup all grunt tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: 'dist'
    },
    watch: {
      less: {
        files: ['less/*.less'],
        tasks: 'buildcss'
      }
    },
    less: {
      options: {
        paths: ['less'],
        compress: false
      },
      files: {
        expand: true,
        flatten: false,
        cwd: 'less/',
        src: ['**/*.less', '!**/_*.less'],
        dest: 'dist/css/',
        ext: '.css'
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      app: {
        src: ['dist/css/*.css', '!dist/css/*.min.css']
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
    lesslint: {
      src: ['less/*.less'],
      options: {
        csslint: {
          'known-properties': true,
          csslintrc: '.csslintrc'
        }
      }
    },
    copy: {
      'bootstrap-font': {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/fonts/',
        src: '*',
        dest: 'dist/fonts/',
        flatten: false,
        filter: 'isFile'
      }
    }
  });
  // register and combine all grunt tasks
  grunt.registerTask('default', ['test', 'clean', 'copy', 'buildcss']);
  grunt.registerTask('buildcss', ['less', 'autoprefixer', 'cssmin']);
  grunt.registerTask('test', ['lesslint']);
};