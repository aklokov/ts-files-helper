function retry(func, retryCount) {
  return function () {
    let success = false;
    let count = retryCount || 5;
    while (!success && count) {
      try {
        func.apply(undefined, arguments);
        success = true;
      } catch (error) {
        count--;
      }
    }
  }
}

module.exports = retry;