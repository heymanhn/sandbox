var createURL = function(lat, lng) {
  if (lat && lng) {
    return 'http://maps.google.com?q=' + lat + ',' + lng;
  }

  return '';
};

var setLocation = function(window, url) {
  window.location = url;
};

var locate = function() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

var onError = function() {
  document.getElementById('error').innerHTML = error.message;
};

var onSuccess = function(pos) {
  var latitude = pos.coords.latitude;
  var longitude = pos.coords.longitude;

  setLocation(window, createURL(latitude, longitude));
};
