var geocoderRev;
var mapRev;
var infowindow = new google.maps.InfoWindow();
var markerRev;

function initializeRev() {
  geocoderRev = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(40.730885,-73.997383);
  var mapOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: 'roadmap'
  }
  mapRev = new google.maps.Map(document.getElementById('map-canvas-reverse'), mapOptions);
}

function codeLatLng() {
  var input = document.getElementById('latlng').value;
  var latlngStr = input.split(',', 2);
  var lat = parseFloat(latlngStr[0]);
  var lng = parseFloat(latlngStr[1]);
  // var lat = 36.19950329;
  // var lng = -78.897619;
  var latlng = new google.maps.LatLng(lat, lng);
  geocoderRev.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        mapRev.setZoom(11);
        markerRev = new google.maps.Marker({
            position: latlng,
            map: mapRev
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(mapRev, markerRev);
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initializeRev);
