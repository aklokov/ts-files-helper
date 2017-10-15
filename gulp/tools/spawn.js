function spawn(cmd, parameters, options) {
  switch (process.platform) {
    case 'win32':
      const spawn = require('cross-spawn');
      return spawn(cmd, parameters, options);
    
    default:
	  const childProcess = require('child_process');
      return childProcess.spawn(cmd, parameters, options);
  }
}

module.exports = spawn;
