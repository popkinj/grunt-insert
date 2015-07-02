/*
 * grunt-injector
 * https://github.com/grunt-injector
 *
 * Copyright (c) 2015 Jamie Popkin, David Hariri
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('insert', 'Insert code from one file into another.', function() {
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
			
			// Expand the file destination(s).
			f.dests = grunt.file.expand(f.dest);
			// Iterate through the result, applying the inserts.
			if(f.dests.length > 0) {
				f.dests.forEach(function(dest) {
					// Read destination file
					var result = grunt.file.read(dest).replace(f.match,src);
	
					// Write the temporary destination file.
					grunt.file.write(dest+"_tmp", result);
	
					// overwrite the original with the temporary file
					grunt.file['delete'](dest);
					grunt.file.copy(dest+"_tmp", dest);
					grunt.file['delete'](dest+"_tmp");
	
					// Print a success message.
					var input = f.src.toString().replace(/.*\//,""); // Remove path
					var output = dest.toString().replace(/.*\//,""); // Remove path
	
					grunt.log.writeln("Injected " + input + " into " + output);
				});
			} else {
				grunt.log.writeln("No valid destination file(s) specified");
			}
		});
	});
};
