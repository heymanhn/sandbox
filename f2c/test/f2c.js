var should = require('chai').should();
var Util = require('../src/util');

describe('util-test', function() {
  var util;

  beforeEach(function() {
    util = new Util();
  });

  it('should pass this canary test', function() {
    (true).should.equal(true);
  });

  it('should pass if f2c returns 0C for 32F', function() {
    var fahrenheit = 32;
    var celcius = util.f2c(fahrenheit);

    celcius.should.equal(0);
  });

  it('should pass if f2c returns 26.67C for 80F', function() {
    var fahrenheit = 80;
    var celcius = util.f2c(fahrenheit);

    celcius.should.equal(26.67);
  });

  it('should pass if f2c returns -6.67C for 20F', function() {
    var fahrenheit = 20;
    var celcius = util.f2c(fahrenheit);

    celcius.should.equal(-6.67);
  });
});
