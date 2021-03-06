'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var template = require('lodash').template;

module.exports = function (data, options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-template', 'Streaming not supported'));
			return;
		}

		try {
			file.contents = new Buffer(template(file.contents.toString(), data, options));
			cb(null, file);
		} catch (err) {
			cb(new gutil.PluginError('gulp-template', err, {fileName: file.path}));
		}
	});
};
