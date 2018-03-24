module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        responsive_images: {
            dev: {
                options: {
                    engine: 'im'
                },
                sizes: [{ name: 'small', width: 320 },
                        { name: 'medium', width: 640 },
                        { name: 'large', width: 800 }],
                files: [{
                    expand: true,
                    src: ['*.{jpg, gif, png}'],
                    cwd: 'img/',
                    dest: 'images/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-responsive-images');

    grunt.registerTask('default', ['responsive_images']);

};