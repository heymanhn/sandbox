describe('create-url test', function() {
  it('should return proper url given lat and lon', function() {
    var lat = -20.125;
    var lng = 112.255;

    var url = createURL(lat, lng);

    url.should.equal('http://maps.google.com?q=-20.125,112.255');
  });

  it('should return proper url given another lat and lon', function() {
    var lat = 37.826;
    var lng = -122.423;

    var url = createURL(lat, lng);

    url.should.equal('http://maps.google.com?q=37.826,-122.423');
  });

  it('should return empty string if latitude is undefined', function() {
    var lat = undefined;
    var lng = -120.158;

    var url = createURL(lat, lng);

    url.should.equal('');
  });

  it('should return empty string if longitude is undefined', function() {
    var lat = 15.781;
    var lng = undefined;

    var url = createURL(lat, lng);

    url.should.equal('');
  });
});
