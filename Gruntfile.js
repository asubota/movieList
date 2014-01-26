module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		files: {
			js: {
				main: 'public/js/application.min.js',
				lib: 'public/js/lib.min.js',
				source: [
					'public/js/*/*.js',
					'public/js/utils.js',
					'public/js/main.js'
				],
				libSource: [
					'public/lib/jquery-2.0.3.min.js',
					'public/lib/underscore-min.js',
					'public/lib/backbone-min.js',
					'public/lib/semantic.min.js'
				],
				tests: {
					specs: 'tests/unit/spec/*.Spec.js',
					helpers: 'tests/unit/spec/*.Helper.js',
				}
			},
			css: {
				main: 'public/css/application.css',
				compile: 'public/styles/css/styles.min.css',
				source: ['public/styles/css/*.css']
			},
			less: {
				source: ['public/styles/less/styles.less']
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			'<%= files.js.main %>': '<%= files.js.source %>'
		},

		concat: {
			options: {
				separator: ';',
				stripBanners: true
			},
			js: {
				src: '<%= files.js.libSource %>',
				dest: '<%= files.js.lib %>'
			},
			css: {
				src: '<%= files.css.source %>',
				dest: '<%= files.css.main %>'
			}
		},

		jshint: {
			options: {
				curly: true,
				eqnull: true,
				eqeqeq: true,
				boss: true,
				lastsemic: true,
				loopfunc: true,
				trailing: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true
			},
			files: ['Gruntfile.js', '<%= files.js.source %>']
		},

		less: {
			development: {
				options: {
					cleancss: true,
					compress: true,
					report: 'min'
				},
				files: {
					'<%= files.css.compile %>': '<%= files.less.source %>'
				}
			}
		},

		watch: {
			files: ['<%= files.js.source %>', '<%= files.less.source %>'],
			tasks: ['less', 'concat']
		},

		jasmine: {
			unit: {
				src: ['<%= files.js.lib %>', '<%= files.js.source %>'],
				options: {
					specs: '<%= files.js.tests.specs %>',
					helpers: '<%= files.js.tests.helpers %>'

/*
					junit: {
						consolidate: true,
						path: "junit-report"
					}
*/

				}
			}
		},
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Concatenate files plugin
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	// Default task(s).
	grunt.registerTask('default', ['less', 'jshint', 'uglify', 'concat', 'jasmine']);
};
