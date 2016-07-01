module.exports = function() {
  this.f2c = function(fahrenheit) {
    return Math.round(((fahrenheit - 32) * (5/9) * 100)) / 100;
  };
};
