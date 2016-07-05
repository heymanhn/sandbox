describe('setLocation test', function() {
  it('should set the URL into location of window', function() {
    var window = {};
    var fakeURL = 'http://foobar.com';
    setLocation(window, fakeURL);

    window.location.should.equal(fakeURL);
  });
});
