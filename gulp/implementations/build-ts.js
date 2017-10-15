const gulp = require('gulp');
var spawn = require('../tools/spawn');
var path = require('path')

gulp.task('build-ts', function (done) {
  const spawned = spawn('tsc', [], { stdio: 'inherit' });
  spawned.setMaxListeners(0);
  spawned.on('close', function(exitCode){
    if (exitCode !== 0) {
      throw new Error('compilation error');
    }
    
    done();
  });
});