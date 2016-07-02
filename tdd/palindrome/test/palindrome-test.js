var should = require('chai').should();
var isPalindrome = require('../src/palindrome');

describe('palindrome-test', function() {
  it('should pass this canary test', function() {
    (true).should.equal(true);
  });

  it('should return true for the word "eye"', function() {
    var word = 'eye';
    isPalindrome(word).should.equal(true);
  });

  it('should return true for the word "madam"', function() {
    var word = 'madam';
    isPalindrome(word).should.equal(true);
  });

  it('should return true for the word "racecar"', function() {
    var word = 'racecar';
    isPalindrome(word).should.equal(true);
  });

  it('should return true for the phrase "mom mom"', function() {
    var phrase = 'mom mom';
    isPalindrome(phrase).should.equal(true);
  });

  it('should return false for the word "taxi"', function() {
    var word = 'taxi';
    isPalindrome(word).should.equal(false);
  });

  it('should return false for an empty string', function() {
    var word = '';
    isPalindrome(word).should.equal(false);
  });

  it('should return false if the input is not defined', function() {
    isPalindrome().should.equal(false);
  });

  it('should return false for a string with two spaces', function() {
    var word = '  ';
    isPalindrome(word).should.equal(false);
  });

  it('should return false for the phrase "mom dad"', function() {
    var phrase = 'mom dad';
    isPalindrome(phrase).should.equal(false);
  });

  it('should throw an error if the word is a number', function() {
    var fn = function() {
      isPalindrome(1234);
    };

    fn.should.throw(Error, 'Can only input strings');
  });

  it('should throw an error if the word contains a number', function() {
    var fn = function() {
      isPalindrome('mad1am');
    };

    fn.should.throw(Error, 'The string contains a number');
  });
});
