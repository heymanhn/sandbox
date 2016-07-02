var should = require('chai').should();
var linesCount = require('../src/files');

describe('test server-side callback', function() {
  it('should return correct lines count for a valid file', function(done) {
    var callback = function(count) {
      count.should.equal(15);
      done();
    };

    linesCount('src/files.js', callback);
  });

  it('should report error for an invalid file name', function(done) {
    var onError = function(error) {
      error.should.equal('unable to open file src/flies.js');
      done();
    }

    linesCount('src/flies.js', undefined, onError);
  });
});
