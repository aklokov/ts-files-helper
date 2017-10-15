const gulpWatch = require('gulp-watch');
const sequence = require('run-sequence');

function watch(watched, task) {
  sequence(task, function (error) {
    gulpWatch(watched, function () {
      sequence(task);
    });
  });
}

module.exports = watch;
