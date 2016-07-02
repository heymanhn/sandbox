module.exports = function(str) {
  if (!str) {
    return false;
  }

  if (typeof str !== 'string') {
    throw new Error('Can only input strings');
  }

  if (str.trim() === '') {
    return false;
  }

  if (str.match(/\d/)) {
    throw new Error('The string contains a number');
  }
    return (str === str.split('').reverse().join(''));
};
