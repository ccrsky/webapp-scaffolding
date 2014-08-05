module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: grunt.file.readJSON('jshint.config.json'),
		concat: grunt.file.readJSON('concat.config.json'),
		watch: {
			css: {
				files: ['src/css/apps/**/pieces/*.css'],
				options: {
					nospawn: true,
					interrupt: true,
					debounceDelay: 250
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				compress: true,
				beautify: false,
				report: false
			},
			js:{
				expand:true,
				cwd:'src/',
				src:['**/*.js'],
				dest:'build/',
				ext:'.js'
			}
		},
		copy:{
			main:{
				expand:true,
				cwd:'src/',
				src:['**/*.html',
					'**/*.json',
					'**/*.ico',
					'**/*.gif',
					'**/*.png',
					'**/*.md',
					'**/*.swf',
					'**/*.zip',
					'**/*.xml',
					'**/*.cab',
					'**/*.map',
					'**/*.xap',
					'**/*.msi'],
				dest:'build/'
			}
		},
		cssmin:{
			my_target:{
				expand:true,
				cwd:'src/css',
				src:['**/*.css'],
				dest:'build/css',
				ext:'.css'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');


	// 根据文件判断需要执行的合并任务

	function getConcatTask(file) {
		var tasks = [],
			detail = null,
			config = grunt.config.get('concat');

		for (var task in config) {
			detail = config[task];
			if (detail.src && detail.src.indexOf(file) != -1) {
				tasks.push(task);
			}
		}

		return tasks;
	}

	// 动态判断合并文件
	grunt.event.on('watch', function(action, path) {
		grunt.option('force', true);

		// 将windows文件分隔符转换为标准斜线
		var file = path.replace(/\\/g, '/');

		// styles
		if (/\.css$/.test(file)) {
			var tasks = getConcatTask(file);
			for (var i = 0; i < tasks.length; i++) {
				grunt.task.run('concat:' + tasks[i]);

				// var tar = grunt.config.get('concat')[tasks[i]]['dest'];

				// console.log(tar)
				// grunt.config(['uglify', 'build', 'src'], tar);
				// grunt.config(['uglify', 'build', 'dest'], tar.replace('.css', '.abc'));
				// grunt.task.run('uglify:build');
			}
		}
	});

	// Default task(s).
	grunt.registerTask('default', ['jshint:apps']);


};