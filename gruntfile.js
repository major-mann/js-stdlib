module.exports = function (grunt) {
    grunt.initConfig({

        curl: {
            nodeEvents: {
                src: 'https://raw.githubusercontent.com/nodejs/node/master/lib/events.js',
                dest: 'lib/events.tmp.js'
            },
            nodeLicense: {
                src: 'https://raw.githubusercontent.com/nodejs/node/master/LICENSE',
                dest: 'lib/license'
            }
        },

        replace: {
            events: {
                src: 'lib/license',
                dest: 'lib/license',
                replacements: [{
                    from: /[^\r\n]+/gm,
                    to: '// $&'
                }]
            },
            events_domain_require: {
                src: 'lib/events.tmp.js',
                dest: 'lib/events.tmp.js',
                replacements: [{
                    from: /require\('domain'\)/g,
                    to: '{ active: false }'
                }]
            },
            events_util_require: {
                src: 'lib/events.tmp.js',
                dest: 'lib/events.tmp.js',
                replacements: [{
                    from: /require\('internal\/util'\)/g,
                    to: '{ error: function error() { ' +
                        'console.error.apply(console, arguments); ' +
                    '} }'
                }]
            }
        },

        // Join the license onto the file
        concat: {
            options: { separator: '' },
            events: {
                src: ['lib/license', 'lib/events.tmp.js'],
                dest: 'lib/events.js'
            }
        },

        // Remove the temporary files
        clean: {
            events: ['lib/events.tmp.js', 'lib/license']
        },

        jshint: {
            options: { },
            check_all: {
                files: {
                    src: ['src/**/*.js']
                }
            }
        },

        jscs: {
            src: 'src/**/*.js',
            options: {
                config: '.jscsrc',
                esnext: false,
                verbose: true,
                fix: false,
                requireCurlyBraces: ['if']
            }
        },

        jasmine_nodejs: {
            options: {
                useHelpers: true,
                specNameSuffix: ".js",
                reporters: {
                    console: {
                        colors: true,
                        clearStack: 1,
                        verbosity: 4,
                        listStyle: 'indent',
                        activity: true
                    }
                }
            },
            check_all: {
                specs: [
                    'spec/clone.js',
                    'spec/copy.js',
                    'spec/epromise.js',
                    'spec/extend.js',
                    'spec/format.date.js',
                    'spec/format.js',
                    'spec/format.number.js',
                    'spec/regex.js',
                    'spec/typeof.js'
                ],
                helpers: [
                    'spec/support/*.js'
                ]
            }
        },

        browserify: {
            dist: {
                files: {
                    'build/stdlib.js': [
                        'src/index.js'
                    ]
                },
                options: {
                    browserifyOptions: {
                        
                    }
                }
            }
        }
    });

    // Load the modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-curl');

    // Create the tasks
    grunt.registerTask('events', ['curl:nodeEvents', 'curl:nodeLicense', 'replace:events', 'replace:events_domain_require', 'replace:events_util_require', 'concat:events', 'clean:events']);
    grunt.registerTask('check_all', ['jshint:check_all', 'jscs', 'jasmine_nodejs:check_all']);
    grunt.registerTask('default', ['events', 'check_all']);

};
