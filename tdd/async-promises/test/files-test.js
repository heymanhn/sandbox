var should = require('chai').should();
require('chai').use(require('chai-as-promised'));
var linesCount = require('../src/files');

describe('readfile call using promises', function() {
  it('should return 16 when opening src/files.js', function(done) {
    linesCount('src/files.js').then(function(data) {
      data.should.equal(16);
      done();
    });
  });

  it('should return 16 using promises', function() {
    return linesCount('src/files.js').then(function(data) {
      data.should.equal(16);
    });
  });

  it('should return 16 using chai-eventually', function() {
    return linesCount('src/files.js').should.eventually.equal(16);
  });

  it('should return an error for an invalid file name', function(done) {
    var fileName = 'src/flies.js';
    return linesCount(fileName).should.be
      .rejectedWith('unable to open file ' + fileName)
      .notify(done);
  });

  it('should return an error - using chai-eventually', function() {
    var fileName = 'src/flies.js';
    return linesCount(fileName).should
      .eventually.be.rejectedWith('unable to open file ' + fileName);
  });
});
