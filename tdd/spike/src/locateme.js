var locate = function() {
  function onSuccess(pos) {
    var crd = pos.coords;

    location = 'https://www.google.com/maps?q='
      + crd.latitude + '+' + crd.longitude;
  };

  function onError(err) {
    document.getElementById('error').innerHTML = err.message;
  };

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
