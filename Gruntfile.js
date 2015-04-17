module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      DesktopInit: {
        options: {
          baseUrl: "Public/js/app",
          paths: {
            "desktop": "init/DesktopInit"
          },
          wrap: true,
          name: "../libs/almond",
          preserveLicenseComments: false,
          optimize: "uglify",
          mainConfigFile: "Public/js/app/config/config.js",
          include: ["desktop"],
          out: "Public/js/app/init/DesktopInit.min.js"
        }
      },
      desktopCSS: {
        options: {
          optimizeCss: "standard",
          cssIn: "./Public/css/desktop.css",
          out: "./Public/css/desktop.min.css"
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'Public/js/app/**/*.js', '!Public/js/app/**/*min.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['requirejs:DesktopInit', 'requirejs:desktopCSS']);
  grunt.registerTask('default', ['test', 'build']);

};
