/*
 * grunt-injector
 * https://github.com/grunt-injector
 *
 * Copyright (c) 2013 Jamie Popkin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('injector', 'Insert code from one file into another.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
				removeComments: true
		});

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Read source file
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				return grunt.file.read(filepath); // Read file source.
			});

			// Read destination file
			if (!grunt.file.exists(f.dest)) {
				grunt.log.warn('Destination file "' + f.dest + '" not found.');
			} else {
				var dest = grunt.file.read(f.dest); // Read file source.
			}
			grunt.log.warn(dest);

			// // Handle options.
			// src += options.punctuation;

			// // Write the destination file.
			// grunt.file.write(f.dest, src);

			// // Print a success message.
			// grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
