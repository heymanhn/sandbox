describe('onSuccess test', function() {
  it('should call createURL with latitude and longitude', function() {
    var createURLSpy = sandbox.spy(window, 'createURL');
    var position = { coords: { latitude: 40.41, longitude: -105.55 }};

    onSuccess(position);
    createURLSpy.should.be.calledWith(40.41, -105.55);
  });

  it('should call setLocation with URL returned by createURL', function() {
    var url = 'http://www.example.com';

    sandbox.stub(window, 'createURL')
           .returns(url);

    var setLocationSpy = sandbox.spy(window, 'setLocation');
    var position = { coords: { latitude: 40.41, longitude: -105.55 }};

    onSuccess(position);
    setLocationSpy.should.be.calledWith(window, url);
  });
});
