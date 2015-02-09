'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg : grunt.file.readJSON('package.json'),
		bowerRequirejs : {
			app : {
				rjsConfig : 'app/scripts/config.js',
				options : {
					baseUrl : './app'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-bower-requirejs');

	grunt.registerTask('default', [ 'bowerRequirejs' ]);

};