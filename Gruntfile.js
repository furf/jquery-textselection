module.exports = function (grunt) {
    "use strict";

    var livereload = {
        host: 'localhost',
        port: 35729
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build: {
            all: {
                dest: "dist/jquery.textselection.js"
            }
        },
        uglify: {
            all: {
                files: {
                    "dist/jquery.textselection.min.js": ["dist/jquery.textselection.js"]
                },
                options: {
                    preserveComments: false,
                    sourceMap: true,
                    ASCIIOnly: true,
                    sourceMapName: "dist/jquery.textselection.min.map",
                    report: "min",
                    beautify: {
                        "ascii_only": true
                    },
                    banner: "/*! jQuery TextSelection v<%= pkg.version %> | GPL-3.0 license */",
                    compress: {
                        "hoist_funs": false,
                        loops: false,
                        unused: false
                    }
                }
            }
        },
        watch: {
            js: {
                files: [
                    'src/**/*.js'
                ],
                tasks: ['build'],
                options: {
                    livereload: livereload
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadTasks("tasks");

    grunt.registerTask("default", ["build", "uglify"]);
};
